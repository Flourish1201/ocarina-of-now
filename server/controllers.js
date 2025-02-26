const mongoose = require('mongoose');
const { Song } = require('../db/index.js');

module.exports = {
  postSong: async (req, res) => {
    console.log(req.body.data);
    const { name, notes } = req.body.data;
    if (!name || !notes) {
      return res.status(400).json({ message: "Name and notes are required" });
    }

    // Adjust the start times of the notes to eliminate empty space before the first note
    const firstNoteTime = Math.min(...notes.map(note => note.startTime));
    const adjustedNotes = notes.map(note => ({
      ...note,
      startTime: note.startTime - firstNoteTime
    }));

    try {
      var newSong = new Song({
        name,
        notes: adjustedNotes
      });
      var savedSong = await newSong.save();
      res.status(201).json({ message: "YO WE POSTED YOUR SONG", song: savedSong });
    } catch (error) {
      res.status(500).json({ message: "Error saving song", error });
    }
  },
  getSongs: async (req, res) => {
    try {
      const songs = await Song.find();
      res.status(200).json(songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ message: "Error fetching songs", error });
    }
  }
}
