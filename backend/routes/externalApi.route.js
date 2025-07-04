// routes/externalApi.route.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/external-data', async (req, res) => {
    try {
        const response = await axios.get('http://marcconrad.com/uob/banana/api.php');
        res.json(response.data); // Forward the data from the external API
    } catch (error) {
        console.error('Error fetching external API:', error);
        res.status(500).json({ message: 'Error fetching external data' });
    }
});

export default router;