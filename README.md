# WeatherApp2

A full-stack weather application built with React + Vite frontend and Express backend that provides real-time weather information with an intuitive, visually appealing interface. The app fetches weather data from the OpenWeather API through a secure Express proxy server.

## Features
- **Geo-location weather lookup** — Automatically detect and display weather for user's current location
- **City search** — Look up weather data by city name
- **Real-time weather data** — Current temperature, conditions, wind speed, pressure, humidity, and visibility
- **Visual weather backgrounds** — Dynamic background images that change based on weather conditions (clear, cloudy, rainy, thunderstorm, haze)
- **Sunrise/Sunset times** — Display sunrise and sunset information for the current location
- **Activity recommendations** — Personalized activity suggestions based on current weather (e.g., cycling, running, gardening)
- **Responsive UI** — Clean, modern interface built with Material-UI components
- **Mobile-friendly design** — Optimized for both desktop and mobile devices

## Repository Structure

- `backend/` — Express server and API proxy
- `weatherapp/` — Vite + React frontend

## Prerequisites
- Node.js (16+ recommended)
- npm (bundled with Node.js)

## Environment variables
Create a `.env` file in `backend/` with the following keys:

```
OPENWEATHER_API_KEY=<your_openweather_api_key>
PORT=3000
```

Do NOT commit `.env` or any API keys to Git. The `backend/.gitignore` already includes `.env`.

## Setup

Backend

```bash
cd backend
npm install
# create .env (see Environment variables above)
npm start
```

Frontend

```bash
cd weatherapp
npm install
npm run dev
# open the URL printed by Vite (usually http://localhost:5173 or another port if 5173 is in use)
```

## Available backend endpoints
- `GET /weather/server` — query params: `city` or `lat` and `lon`.
  - Example: `/weather/server?city=Delhi`

## Common issues & Troubleshooting
- Blank or loading UI: ensure both backend and frontend dev servers are running.
- CORS errors: backend uses `cors()` by default. Make sure frontend requests are to the correct backend origin and port.
- Port conflicts: frontend Vite falls back to a different port if 5173 is in use — check the terminal output for the actual URL.
- API errors: confirm `OPENWEATHER_API_KEY` is valid and has quota. Check backend logs for error details.

## Notes
- The frontend expects the backend at `http://localhost:3000` by default.

## License
This project is provided as-is. Add a LICENSE file if you want to specify terms.

----
Created and edited files:
- `backend/.gitignore` (leave as-is)
- `backend/.env` (local only — do not commit)

If you want, I can:
- add a `backend/.env.example` file
- add npm `start:dev` scripts with `nodemon`
- add a short CONTRIBUTING section