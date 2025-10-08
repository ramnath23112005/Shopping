const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());

// Load mock data
const songs = require('./data/songs.json');
const playlists = require('./data/playlists.json');

// API Routes
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
