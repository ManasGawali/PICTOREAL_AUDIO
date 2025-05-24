const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');

const allowedOrigins = ["https://www.pictoreal.in", "http://localhost:3000"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
}));


// Serve all audio files statically
app.use('/audio/27/mar', express.static(path.join(__dirname, 'public/audio/mar/V27')));
app.use('/audio/27/hin', express.static(path.join(__dirname, 'public/audio/hin/V27')));
app.use('/audio/27/eng', express.static(path.join(__dirname, 'public/audio/eng/V27')));

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/tracks/:id/:lang', (req, res) => {
    const { id, lang } = req.params;

    try {
        const tracksPath = path.join(__dirname, `data/${lang}tracks.json`);
        const tracks = JSON.parse(fs.readFileSync(tracksPath));

        const filteredTracks = tracks.filter(track => track.volume === parseInt(id));

        if (filteredTracks.length === 0) {
            return res.status(404).json({ error: 'No tracks found for the given volume.' });
        }

        res.json(filteredTracks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read or parse tracks file.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.use(express.json());
