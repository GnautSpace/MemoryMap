const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'missing query' });

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`, {
            headers: {
                'User-Agent': `MemoryMap/1.0 (${process.env.CONTACT_EMAIL})`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Nominatim data:', error);
        res.status(500).json({ error: 'failed to fetch location data' });
    }
});

app.listen(3001, () => console.log("Proxy running on http://localhost:3001"));
