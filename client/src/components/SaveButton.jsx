import React from 'react';

export default function SaveButton({ stopRecording }) {

  return (
    <div className="relative">
      <button onClick={stopRecording} className="btn btn-xl">📍 Save</button>
    </div>
  )
}