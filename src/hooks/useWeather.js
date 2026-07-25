import { useState, useEffect, useCallback } from 'react';
import { searchCity, getWeatherData, getAirQualityData } from '../utils/api';

const DEFAULT_LOCATION = { name: 'London', lat: 51.50853, lon: -0.12574, country: 'United Kingdom' };

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' or 'F'
  const [isDay, setIsDay] = useState(true);
  const [weatherCode, setWeatherCode] = useState(0);

  const fetchWeather = useCallback(async (locationObj) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, aqi] = await Promise.all([
        getWeatherData(locationObj.lat, locationObj.lon),
        getAirQualityData(locationObj.lat, locationObj.lon)
      ]);

      setData({ location: locationObj, weather, aqi });
      
      // Update theme dependencies
      const isDayCurrent = weather.current.is_day === 1;
      setIsDay(isDayCurrent);
      setWeatherCode(weather.current.weather_code);

      // Save to localStorage
      localStorage.setItem('lastLocation', JSON.stringify(locationObj));
      
      // Apply theme class to body
      document.body.className = '';
      if (!isDayCurrent) {
        document.body.classList.add('theme-night');
      } else if (weather.current.weather_code > 50) {
        document.body.classList.add('theme-rainy');
      } else {
        document.body.classList.add('theme-day');
      }

    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchCity(query);
      const topResult = results[0];
      const locationObj = {
        name: topResult.name,
        lat: topResult.latitude,
        lon: topResult.longitude,
        country: topResult.country || '',
        admin1: topResult.admin1 || ''
      };
      await fetchWeather(locationObj);
    } catch (err) {
      setError(err.message === 'City not found' ? 'City not found. Please check spelling.' : 'Error searching city.');
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Since we don't have reverse geocoding easily in open-meteo without another endpoint, 
        // we can fetch nearest city from geocoding or just display "Current Location".
        // Actually, open-meteo geocoding has reverse? Wait, it's easier to just call weather API.
        const locationObj = {
          name: 'Current Location',
          lat: latitude,
          lon: longitude,
          country: ''
        };
        await fetchWeather(locationObj);
      },
      (err) => {
        setError('Location permission denied or unavailable.');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('lastLocation');
    if (savedLocation) {
      fetchWeather(JSON.parse(savedLocation));
    } else {
      fetchWeather(DEFAULT_LOCATION);
    }
  }, [fetchWeather]);

  return {
    data,
    loading,
    error,
    unit,
    setUnit,
    handleSearch,
    handleGeolocation,
    isDay,
    weatherCode
  };
}
