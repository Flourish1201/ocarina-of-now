import React from 'react';

export default function FullSongModal({ notes, onClose }) {
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
  const keyMapping = Object.entries(noteMapping).reduce((acc, [key, note]) => {
    acc[note] = key;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-neutral text-neutral-content bg-base-100 p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Full Song</h2>
        <div className="overflow-y-auto max-h-96">
          {notes.map((note, index) => (
            <div key={index} className="mb-2 p-2 border-b border-gray-200">
              <p className="text-lg">
                <span className="font-semibold text-neutral-content">Key:</span> <span className="text-neutral-content font-bold">{keyMapping[note.note]}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold text-neutral-content">Note:</span> <span className="text-neutral-content font-bold">{note.note}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold text-neutral-content">Duration:</span> <span className="text-neutral-content font-bold">{note.duration.toFixed(2)}s</span>
              </p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="btn btn-primary mt-4 w-full">Close</button>
      </div>
    </div>
  );
}