const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Example route to render the main page
app.get('/', async (req, res) => {
    try {
        const plData = await axios.get('https://api.football-data.org/v2/competitions/PL/standings', {
            headers: { 'X-Auth-Token': '01197cf3977a4f4c8ebd22db4224e89b' }
        });

        const standings = plData.data.standings[0].table;
        res.render('index', { standings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Premier League data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
