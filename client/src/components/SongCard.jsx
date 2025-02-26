import React from 'react';
import Playback from './Playback.jsx';
import FullSongModal from "./FullSongModal.jsx";
import * as Tone from 'tone';

export default function SongCard({ song, synthRef }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const recorder = React.useRef(null);

  React.useEffect(() => {
    recorder.current = new Tone.Recorder();
    synthRef.current.connect(recorder.current);
  }, [synthRef]);

  const noteDisplay = song.notes.slice(0, 5).map((note) => `${note.note} `);
  const end = song.notes.length > 5 ? "..." : "";

  const playSong = () => {
    // Logic to play the song using synthRef
    song.notes.forEach((note) => {
      setTimeout(() => {
        synthRef.current.triggerAttackRelease(note.note, note.duration);
      }, note.startTime * 1000);
    });
  };

  const exportToMp3 = async () => {
    recorder.current.start();

    // Play the song to record it
    playSong();

    setTimeout(async () => {
      const recording = await recorder.current.stop();
      const url = URL.createObjectURL(recording);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${song.name}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }, song.notes[song.notes.length - 1].startTime * 1000 + song.notes[song.notes.length - 1].duration * 1000); // Adjust the duration as needed
  };

  return (
    <li className="align-left">
      <div className="card w-50 h-70 bg-neutral text-neutral-content bg-base-100 card-xs shadow-lg mt-5 card-border">
        <div className="card-body">
          <h4 className="card-title">Title: </h4>
          <p>{song.name}</p>
          <h4 className="card-title">Notes:</h4>
          <p>{noteDisplay}{end}</p>
          <div className="relative">
            <button className="card-actions btn btn-md w-full btn-primary" onClick={() => setIsModalOpen(true)}>full song</button>
            <Playback recordedNotes={song.notes} synthRef={synthRef} />
            <button onClick={exportToMp3} className="card-actions btn btn-md w-full btn-accent">Export to MP3</button>
          </div>
        </div>
      </div>
      {isModalOpen && <FullSongModal notes={song.notes} onClose={() => setIsModalOpen(false)} />}
    </li>
  );
}
