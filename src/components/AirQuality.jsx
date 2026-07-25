import React from 'react';
import { Wind } from 'lucide-react';
import { getAQIStatus } from '../utils/helpers';

export default function AirQuality({ aqiData }) {
  if (!aqiData) return null;

  const currentAqi = aqiData.current.european_aqi;
  const pm10 = aqiData.current.pm10;
  const pm25 = aqiData.current.pm2_5;
  
  const status = getAQIStatus(currentAqi);

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Wind size={20} />
        <h3 style={{ margin: 0 }}>Air Quality Index</h3>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 }} className={status.textClass}>
          {currentAqi}
        </div>
        <div style={{ paddingBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 500 }} className={status.textClass}>
          {status.label}
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>PM2.5</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{pm25} µg/m³</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min((pm25 / 110) * 100, 100)}%`, height: '100%', background: status.color, transition: 'width 1s ease-out' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>PM10</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{pm10} µg/m³</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min((pm10 / 150) * 100, 100)}%`, height: '100%', background: status.color, transition: 'width 1s ease-out' }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}
