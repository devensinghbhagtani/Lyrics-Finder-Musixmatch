const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000; // You can choose a different port if needed
const apiKey = '7bdf3a86a36a0e1347ad0f5521fd3ac2'; // Replace with your Musixmatch API key

app.use(cors());

app.use(express.static('public')); // Serve your static assets (HTML and JavaScript)

app.get('/search-artist', async (req, res) => {
    const songArtist = req.query.songArtist;
    const searchUrl = `https://api.musixmatch.com/ws/1.1/track.search?q_artist=${songArtist}&page_size=10&page=1&s_track_rating=desc&apikey=${apiKey}`;
    console.log(`Server is running on port ${port}`);
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/search-lyrics', async (req, res) => {
    const songTrack = req.query.songTrack;    
    const searchUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${songTrack}&apikey=${apiKey}`;
    console.log(`Server is running on port ${port}`);
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});