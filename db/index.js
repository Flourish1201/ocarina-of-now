const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/OoN').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const noteSchema = new mongoose.Schema({
  note: { type: String, required: true },
  startTime: { type: Number, required: true },
  duration: { type: Number, required: true }
});

const songSchema = new mongoose.Schema({
  name: {type: String, required: true},
  notes: [noteSchema]
}, { collection: 'Songs' })

const Song = mongoose.model("Songs", songSchema);

module.exports = {
  Song
}