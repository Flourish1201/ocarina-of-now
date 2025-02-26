import React, { useRef, useState, useEffect } from 'react';
import * as Tone from "tone";

export default function Playback({ recordedNotes, synthRef }) {
  const partRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const playRecording = async () => {
    if (isPlaying) {
      // Stop playback if it is currently playing
      if (partRef.current) {
        partRef.current.stop(0);
        partRef.current.dispose();
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
      setIsPlaying(false);
      return;
    }

    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
    }

    Tone.Transport.stop();
    Tone.Transport.cancel();

    const firstNoteTime = Math.min(...recordedNotes.map(note => note.startTime));
    const adjustedNotes = recordedNotes.map(note => ({
      ...note,
      startTime: note.startTime - firstNoteTime
    }));

    const events = adjustedNotes.map(({ note, startTime, duration }) => ({
      time: startTime,
      note,
      duration,
    }));

    partRef.current = new Tone.Part((time, { note, duration }) => {
      synthRef.current.triggerAttackRelease(note, duration, time);
    }, events).start(0);

    setIsPlaying(true);
    setPlaybackTime(0);

    Tone.Transport.start();

    const duration = Math.max(...adjustedNotes.map(note => note.startTime + note.duration));
    setTotalDuration(duration);

    const interval = setInterval(() => {
      setPlaybackTime(prevTime => {
        if (prevTime >= duration) {
          clearInterval(interval);
          setIsPlaying(false);
          return duration;
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  return (
    <div className="relative">
      <button onClick={playRecording} className="card-actions btn btn-secondary btn-md mt-1 mb-1 w-full">
        {isPlaying ? `${Math.floor(playbackTime)}s/${Math.ceil(totalDuration)}s ⏸️` : 'Playback'}
      </button>
    </div>
  );
}