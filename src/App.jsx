import React from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import AirQuality from './components/AirQuality';
import ForecastChart from './components/ForecastChart';
import DailyForecast from './components/DailyForecast';
import SkeletonLoader from './components/SkeletonLoader';

function App() {
  const {
    data,
    loading,
    error,
    unit,
    setUnit,
    handleSearch,
    handleGeolocation,
    isDay
  } = useWeather();

  return (
    <>
      <SearchBar 
        onSearch={handleSearch} 
        onGeolocation={handleGeolocation} 
        error={error} 
      />

      {loading && !data ? (
        <SkeletonLoader />
      ) : data ? (
        <div className="grid md:grid-cols-3">
          <CurrentWeather 
            weather={data.weather} 
            location={data.location} 
            unit={unit} 
            setUnit={setUnit}
            isDay={isDay} 
          />
          
          <div className="md:col-span-1">
            <AirQuality aqiData={data.aqi} />
          </div>

          <div className="md:col-span-2">
            <ForecastChart weather={data.weather} unit={unit} />
          </div>

          <DailyForecast weather={data.weather} unit={unit} />
        </div>
      ) : null}
    </>
  );
}

export default App;
