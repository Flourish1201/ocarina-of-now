import React from 'react';
import SongCard from './SongCard.jsx';

export default function CommunityBoard({ songs }) {
  console.log("community board: ", songs);
  return (
    <div>
      <p>Community Songs:</p>
    <ul>
      {songs.map((song) => { return(<SongCard song={song} />)})}
    </ul>
    </div>
  )
}