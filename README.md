# WeatherSphere Dashboard

WeatherSphere is a modern, responsive, and dynamic weather dashboard built with React and Vite. It consumes real-time weather and air quality data from the Open-Meteo APIs and presents it in a beautiful glassmorphism interface that adapts to the time of day and current weather conditions.



## Features

- **Real-time Metrics**: Current temperature (with °C / °F toggle), apparent temperature, humidity, wind speed, and UV index.
- **Air Quality Index (AQI)**: Dynamic color-coded AQI metric showing European AQI and PM levels.
- **24-hour Forecast**: Interactive and fluid line chart using Chart.js to visualize the temperature trend for the next 24 hours.
- **5-Day Extended Forecast**: A horizontally scrollable list containing the prognosis for the upcoming 5 days.
- **Geolocation & Search**: Uses browser geolocation or an advanced geocoding search to find any city or country in the world.
- **Dynamic Theming**: The background and UI colors adapt depending on whether it's daytime, nighttime, or raining at the requested location.
- **Persistence**: Automatically caches your last searched location in your browser's local storage so you don't lose it upon refresh.

## Tech Stack

- **Framework**: React.js (Bootstrapped with Vite)
- **Styling**: Vanilla CSS (CSS variables, Grid, Flexbox, Custom Glassmorphism UI)
- **Icons**: Lucide React
- **Charts**: Chart.js (`react-chartjs-2`)
- **APIs**: [Open-Meteo](https://open-meteo.com/) (Weather API, Air Quality API, Geocoding API)

## Installation & Local Development

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/carlos2024r3223rw/weathersphere-dashboard.git
   cd weathersphere-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## Deployment

This project uses `gh-pages` to easily deploy the built static files to GitHub Pages.

To deploy to production:
```bash
npm run deploy
Day mode
<img width="1717" height="961" alt="image" src="https://github.com/user-attachments/assets/4c215453-213a-4427-83ae-e900c65b8f14" />
night mode
<img width="1642" height="989" alt="image" src="https://github.com/user-attachments/assets/67b69955-d730-4299-919d-cfaeae06e13b" />


```
This script will automatically run `npm run build` and then push the `dist/` output to the `gh-pages` branch.

## Acknowledgements
Designed and built to showcase fluid, dynamic UX with robust API integration. Data provided by Open-Meteo.
