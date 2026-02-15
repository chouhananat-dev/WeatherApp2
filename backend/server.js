require('dotenv').config(); 
// dotenv is a library that loads environment variables from a .env file into process.env, 
// dotenv enables the node.js to access the environment variables defined in the .env file,
// helping to keep sensitive information like API keys out of the source code.
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
// allowing cross-origin requests from the frontend,
// which is essential for the frontend to communicate with this backend server without running into CORS issues.

app.get('/weather/server', async (req, res) => {
    const { city, lat, lon } = req.query;
    const apikey = process.env.OPENWEATHER_API_KEY;
    let url;
    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    } else {
        return res.status(400).json({ error: "Provide city or coordinates!" });
    }
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data from provider." });
    }
});
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})