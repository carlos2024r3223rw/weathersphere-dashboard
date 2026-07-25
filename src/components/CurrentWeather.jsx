import React from 'react';
import * as Icons from 'lucide-react';
import { cToF, getWeatherCondition } from '../utils/helpers';

export default function CurrentWeather({ weather, location, unit, setUnit, isDay }) {
  if (!weather || !location) return null;

  const current = weather.current;
  const tempC = Math.round(current.temperature_2m);
  const feelsC = Math.round(current.apparent_temperature);
  const tempDisplay = unit === 'C' ? tempC : Math.round(cToF(tempC));
  const feelsDisplay = unit === 'C' ? feelsC : Math.round(cToF(feelsC));
  
  const condition = getWeatherCondition(current.weather_code, isDay ? 1 : 0);
  const IconComponent = Icons[condition.icon] || Icons.HelpCircle;

  // Since UV index is typically in hourly data in open-meteo, we grab the current hour's UV index.
  // We need to find the index of the current hour.
  const currentHour = new Date().getHours();
  // Simplified: we can just grab hourly.uv_index[0] assuming API returns from current time if we use timezone auto.
  // Actually, open-meteo returns hourly data starting from 00:00. Let's just find the closest hour.
  const hourIndex = weather.hourly.time.findIndex(t => new Date(t).getHours() === currentHour) || 0;
  const uvIndex = weather.hourly.uv_index[hourIndex] || 0;

  return (
    <div className="glass-panel animate-fade-in" style={{ gridColumn: '1 / -1', position: 'relative' }}>
      
      {/* Unit Toggle */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <div className="toggle-switch">
          <button 
            className={`toggle-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => setUnit('C')}
          >
            °C
          </button>
          <button 
            className={`toggle-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => setUnit('F')}
          >
            °F
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{location.name}</h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>{location.country}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <IconComponent size={80} strokeWidth={1.5} />
          <div>
            <div style={{ fontSize: '5rem', fontWeight: 700, lineHeight: 1 }}>
              {tempDisplay}°
            </div>
            <div style={{ fontSize: '1.5rem', opacity: 0.9 }}>
              {condition.text}
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Icons.Thermometer size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Feels like</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{feelsDisplay}°</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Icons.Droplets size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Humidity</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.relative_humidity_2m}%</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Icons.Wind size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Wind Speed</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{current.wind_speed_10m} km/h</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Icons.Sun size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>UV Index</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{uvIndex.toFixed(1)}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
