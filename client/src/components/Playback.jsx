import React, { useRef } from 'react';
import * as Tone from "tone";

export default function Playback({ recordedNotes, synthRef }) {
  const partRef = useRef(null);

  const playRecording = () => {
    if (partRef.current) {
      partRef.current.stop();
      partRef.current.dispose();
    }

    const events = recordedNotes.map(({ note, startTime, duration }) => ({
      time: startTime,
      note,
      duration,
    }));

    partRef.current = new Tone.Part((time, { note, duration }) => {
      synthRef.current.triggerAttackRelease(note, duration, time);
    }, events).start(0);

    Tone.Transport.start();
  };

  return (
    <div className="absolute top-180 left-50">
    <button onClick={playRecording} className="btn btn-lg">🔊 Playback</button>
  </div>
  );
}