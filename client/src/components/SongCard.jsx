import React from 'react';

export default function SongCard({ song }) {
  const noteDisplay = song.notes.slice(0, 5).map((note) => {return(`${note.note} `)});
  if (song.notes.length > 5) {
    var end = "..."
  } else {
    var end = ""
  }
  return (
    <li>
      <p>----------------------------------</p>
      <p>Title:</p>
      <p>{song.name}</p>
      <p>Notes:</p>
      <p> {noteDisplay}{end}</p>
      <p>----------------------------------</p>
    </li>
  )
}