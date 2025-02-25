import React, { useEffect, useState, useRef } from 'react';
import * as Tone from "tone";
import SaveButton from './SaveButton.jsx';
import RecordButton from './RecordButton.jsx';
import Playback from './Playback.jsx';

export default function ToneTest({ onRecord }) {
  const [pressedKeys, setPressedKeys] = useState({}); // Track multiple keys pressed
  const [recordedNotes, setRecordedNotes] = useState([]);
  const synthRef = useRef(null);
  useEffect(() => {
    // Initialize the synth only once
    synthRef.current = new Tone.Synth({
      oscillator: {
        type: 'sine',  // The sine wave gives a smooth, soft tone
      },
      envelope: {
        attack: 0.6,  // Short attack for a breathy start
        decay: 0.4,   // Decay for a smooth release
        sustain: .2, // Low sustain
        release: 1, // Longer release to let the note fade like an ocarina
      }
    }).toDestination();
    // Add reverb to simulate the space around the sound
    const reverb = new Tone.Reverb(3).toDestination();
    const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
    const eq = new Tone.EQ3(0, -10, -20).toDestination(); // Adjust EQ settings as needed
    synthRef.current.chain(reverb, delay, eq);

    return () => {
      synthRef.current.dispose();
    };
  }, []);

  const noteMapping = {
    'w': 'D4',
    'a': 'B4',
    's': 'F4',
    'd': 'A4',
    'h': 'B3',
    'j': 'F3',
    'k': 'A3',
    ' ': 'C3',
  };

  const handleDown = (event) => {
    Tone.start();
    if (noteMapping[event.key] && !pressedKeys[event.key]) {
      const startTime = Tone.now();
      synthRef.current.triggerAttack(noteMapping[event.key]);
      setPressedKeys(prev => ({ ...prev, [event.key]: { startTime } })); // Mark the key as pressed
    }
  };

  const handleUp = (event) => {
    Tone.start();
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
    <div>
      <Playback recordedNotes={recordedNotes} synthRef={synthRef}/>
      <RecordButton startRecording={startRecording}/>
      <SaveButton stopRecording={stopRecording}/>
    </div>
  )
}