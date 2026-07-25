import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Activity } from 'lucide-react';
import { cToF, formatTime } from '../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export default function ForecastChart({ weather, unit }) {
  if (!weather) return null;

  // We want the next 24 hours.
  // The API returns hourly data starting from 00:00 of the current day.
  // We need to slice 24 hours starting from the current hour.
  const currentHourIndex = weather.hourly.time.findIndex(t => new Date(t).getHours() === new Date().getHours()) || 0;
  
  const next24HoursData = weather.hourly.temperature_2m.slice(currentHourIndex, currentHourIndex + 24);
  const next24HoursTime = weather.hourly.time.slice(currentHourIndex, currentHourIndex + 24);

  const displayData = unit === 'C' ? next24HoursData : next24HoursData.map(cToF);
  const labels = next24HoursTime.map(formatTime);

  const data = {
    labels,
    datasets: [
      {
        label: `Temperature (${unit === 'C' ? '°C' : '°F'})`,
        data: displayData,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 0,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return 'rgba(255, 255, 255, 0.1)';
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: false,
        callbacks: {
          label: (context) => `${Math.round(context.parsed.y)}°`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { 
          color: 'rgba(255,255,255,0.7)',
          maxTicksLimit: 8,
          maxRotation: 0,
          font: { family: "'Outfit', sans-serif" }
        }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.1)', drawBorder: false },
        ticks: { 
          color: 'rgba(255,255,255,0.7)',
          callback: (value) => `${value}°`,
          font: { family: "'Outfit', sans-serif" }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Activity size={20} />
        <h3 style={{ margin: 0 }}>24h Forecast</h3>
      </div>
      <div style={{ flex: 1, position: 'relative', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
