const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const AQI_API_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const GEOCODE_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

/**
 * Searches for a city and returns its coordinates and details.
 */
export async function searchCity(query) {
  const response = await fetch(`${GEOCODE_API_URL}?name=${encodeURIComponent(query)}&count=5&language=es&format=json`);
  if (!response.ok) throw new Error('Failed to fetch city data');
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }
  
  return data.results;
}

/**
 * Fetches comprehensive weather data for given coordinates.
 */
export async function getWeatherData(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,weather_code,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto'
  });

  const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  return response.json();
}

/**
 * Fetches Air Quality data for given coordinates.
 */
export async function getAirQualityData(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'european_aqi,us_aqi,pm10,pm2_5',
    timezone: 'auto'
  });

  const response = await fetch(`${AQI_API_URL}?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch air quality data');
  return response.json();
}
