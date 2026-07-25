import React from 'react';
import * as Icons from 'lucide-react';
import { Calendar } from 'lucide-react';
import { cToF, getWeatherCondition, getDayName } from '../utils/helpers';

export default function DailyForecast({ weather, unit }) {
  if (!weather || !weather.daily) return null;

  // Next 5 days
  const days = weather.daily.time.slice(1, 6);
  const maxTemps = weather.daily.temperature_2m_max.slice(1, 6);
  const minTemps = weather.daily.temperature_2m_min.slice(1, 6);
  const codes = weather.daily.weather_code.slice(1, 6);

  return (
    <div className="glass-panel animate-fade-in" style={{ gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Calendar size={20} />
        <h3 style={{ margin: 0 }}>5-Day Forecast</h3>
      </div>
      
      <div className="horizontal-scroll">
        {days.map((dayString, index) => {
          const condition = getWeatherCondition(codes[index], 1); // 1 for day icon
          const IconComp = Icons[condition.icon] || Icons.HelpCircle;
          
          const maxC = Math.round(maxTemps[index]);
          const minC = Math.round(minTemps[index]);
          const maxDisplay = unit === 'C' ? maxC : Math.round(cToF(maxC));
          const minDisplay = unit === 'C' ? minC : Math.round(cToF(minC));

          return (
            <div 
              key={dayString} 
              style={{ 
                flex: '0 0 auto',
                minWidth: '130px',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '1rem',
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{getDayName(dayString)}</div>
              <IconComp size={36} strokeWidth={1.5} style={{ margin: '0.5rem 0' }} />
              <div style={{ fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem', opacity: 0.8, minHeight: '40px' }}>
                {condition.text}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', fontWeight: 600 }}>
                <span>{maxDisplay}°</span>
                <span style={{ opacity: 0.6 }}>{minDisplay}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
