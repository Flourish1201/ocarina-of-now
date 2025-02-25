import React from 'react';

export default function SaveButton({ stopRecording }) {

  return (
    <div className="absolute top-180 right-120">
      <button onClick={stopRecording} className="btn btn-lg">📍 Save</button>
    </div>
  )
}