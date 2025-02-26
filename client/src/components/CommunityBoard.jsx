import React from 'react';
import SongCard from './SongCard.jsx';

export default function CommunityBoard({ songs, synthRef }) {
  console.log("community board: ", songs);
  return (
    <div className="flex flex-col p-4 bg-neutral text-neutral-content bg-base-100 rounded-lg shadow-lg h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center sticky top-0 bg-neutral text-neutral-content bg-base-100 p-4 rounded-lg shadow-lg">Community Songs</h2>
      <ul className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {songs.map((song, index) => (
          <SongCard key={index} song={song} synthRef={synthRef} />
        ))}
      </ul>
    </div>
  );
}