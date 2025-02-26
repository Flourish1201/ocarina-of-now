import React from 'react';

export default function RecordButton({ startRecording }) {

  return (
    <div className="relative">
      <button onClick={startRecording} className="btn btn-xl">🟥 Record</button>
    </div>
  )
}