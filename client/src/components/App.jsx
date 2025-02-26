import React from 'react';
import '../input.css'; // Import the CSS file
import InteractiveOcarina from './InteractiveOcarina.jsx';
import ToneTest from './ToneTest.jsx';
import RecordButton from './RecordButton.jsx';
import SaveButton from './SaveButton.jsx';
import CommunityBoard from './CommunityBoard.jsx';
import axios from 'axios';
import * as Tone from "tone";

const App = () => {
  const [songs, setSongs] = React.useState([]);
  const synthRef = React.useRef(null);

  React.useEffect(() => {
    // Initialize the synth only once
    synthRef.current = new Tone.Synth({
      volume: -12,
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

  React.useEffect(() => {
    axios.get('http://localhost:3000/community/songs')
    .then(res => {
      setSongs(res.data);
    })
  }, []);

  const onRecord = (notes) => {
    axios.post('http://localhost:3000/community/songs', {data: notes})
    .then(res => {
      console.log(res);
      axios.get('http://localhost:3000/community/songs')
      .then(res => {
        setSongs(res.data);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    synthRef.current.volume.value = newVolume;
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      <div className="w-1/4 h-full">
        <CommunityBoard songs={songs} synthRef={synthRef} />
      </div>
      <div className="flex-grow p-4 overflow-hidden">
      <h1 className="text-5xl font-extrabold text-center text-secondary mb-8">Welcome to Ocarina of Now</h1>
        <ToneTest onRecord={onRecord} synthRef={synthRef} />
        <InteractiveOcarina />
      </div>
      <div className="absolute top-4 right-4">
        <label htmlFor="volume">Volume: </label>
        <input
          id="volume"
          type="range"
          min="-30"
          max="10"
          step="2"
          defaultValue="-12"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default App;