import React from 'react';

export default function RecordButton({ startRecording }) {

  return (
    <div className="absolute top-180 right-150">
      <button onClick={startRecording} className="btn btn-lg">🟥 Record</button>
    </div>
  )
}