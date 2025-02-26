import React, { useEffect, useState, useRef } from 'react';
import * as Tone from "tone";
import SaveButton from './SaveButton.jsx';
import RecordButton from './RecordButton.jsx';
import Playback from './Playback.jsx';

export default function ToneTest({ onRecord, synthRef }) {
  const [pressedKeys, setPressedKeys] = useState({}); // Track multiple keys pressed
  const [recordedNotes, setRecordedNotes] = useState([]);

  const noteMapping = {
    'w': 'F4',
    'a': 'B4',
    's': 'D4',
    'd': 'A4',
    'h': 'B3',
    'j': 'F3',
    'k': 'A3',
    'l': 'C5',
  };

  const handleDown = async (event) => {
    await Tone.start();
    if (noteMapping[event.key] && !pressedKeys[event.key]) {
      const startTime = Tone.now();
      synthRef.current.triggerAttack(noteMapping[event.key]);
      setPressedKeys(prev => ({ ...prev, [event.key]: { startTime } })); // Mark the key as pressed
    }
  };

  const handleUp = async (event) => {
    await Tone.start();
    if (noteMapping[event.key] && pressedKeys[event.key]) {
      const endTime = Tone.now();
      synthRef.current.triggerRelease();
      setPressedKeys(prev => {
        const { startTime } = prev[event.key];
        const duration = endTime- startTime;
        setRecordedNotes(notes => [...notes, {  note: noteMapping[event.key], startTime, duration }]);
        return {...prev, [event.key]: false };
      }); // Mark the key as released
    }
  };

  const startRecording = () => {
    setRecordedNotes([]); // Clear previous recordings
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
  };

  const stopRecording = () => {
    window.removeEventListener('keydown', handleDown);
    window.removeEventListener('keyup', handleUp);
    const songName = window.prompt("Enter a name for your song:");
    if (songName) {
      onRecord({ name: songName, notes: recordedNotes }); // Pass the song name and recorded notes to the parent component
    } else {
      onRecord({ name: "Untitled", notes: recordedNotes }); // Default to "Untitled" if no name is provided
    }
  };

  useEffect(() => {
    const downHandler = (event) => handleDown(event);
    const upHandler = (event) => handleUp(event);

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [pressedKeys]);

  return (
    <div className="flex">
      <RecordButton startRecording={startRecording}/>
      <SaveButton stopRecording={stopRecording}/>
    </div>
  )
}