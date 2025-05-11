const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
}));

app.use('/audio', express.static(path.join(__dirname, 'public/audio')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.get('/tracks', (req, res) => {
    const tracks = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/tracks.json')));
    res.json(tracks);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


app.use(express.json());