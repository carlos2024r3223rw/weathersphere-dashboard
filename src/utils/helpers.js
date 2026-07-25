/**
 * Converts Celsius to Fahrenheit
 */
export const cToF = (celsius) => (celsius * 9/5) + 32;

/**
 * Gets a human readable description and an icon name for WMO weather codes.
 */
export const getWeatherCondition = (code, isDay = 1) => {
  const codes = {
    0: { text: 'Clear sky', icon: isDay ? 'Sun' : 'Moon' },
    1: { text: 'Mainly clear', icon: isDay ? 'CloudSun' : 'CloudMoon' },
    2: { text: 'Partly cloudy', icon: isDay ? 'CloudSun' : 'CloudMoon' },
    3: { text: 'Overcast', icon: 'Cloud' },
    45: { text: 'Fog', icon: 'CloudFog' },
    48: { text: 'Depositing rime fog', icon: 'CloudFog' },
    51: { text: 'Light drizzle', icon: 'CloudDrizzle' },
    53: { text: 'Moderate drizzle', icon: 'CloudDrizzle' },
    55: { text: 'Dense drizzle', icon: 'CloudDrizzle' },
    56: { text: 'Light freezing drizzle', icon: 'CloudSnow' },
    57: { text: 'Dense freezing drizzle', icon: 'CloudSnow' },
    61: { text: 'Slight rain', icon: 'CloudRain' },
    63: { text: 'Moderate rain', icon: 'CloudRain' },
    65: { text: 'Heavy rain', icon: 'CloudRain' },
    66: { text: 'Light freezing rain', icon: 'CloudSnow' },
    67: { text: 'Heavy freezing rain', icon: 'CloudSnow' },
    71: { text: 'Slight snow fall', icon: 'Snowflake' },
    73: { text: 'Moderate snow fall', icon: 'Snowflake' },
    75: { text: 'Heavy snow fall', icon: 'Snowflake' },
    77: { text: 'Snow grains', icon: 'Snowflake' },
    80: { text: 'Slight rain showers', icon: 'CloudRain' },
    81: { text: 'Moderate rain showers', icon: 'CloudRain' },
    82: { text: 'Violent rain showers', icon: 'CloudLightning' },
    85: { text: 'Slight snow showers', icon: 'CloudSnow' },
    86: { text: 'Heavy snow showers', icon: 'CloudSnow' },
    95: { text: 'Thunderstorm', icon: 'CloudLightning' },
    96: { text: 'Thunderstorm with slight hail', icon: 'CloudLightning' },
    99: { text: 'Thunderstorm with heavy hail', icon: 'CloudLightning' }
  };

  return codes[code] || { text: 'Unknown', icon: 'HelpCircle' };
};

/**
 * Gets AQI status info (European AQI).
 */
export const getAQIStatus = (aqi) => {
  if (aqi <= 20) return { label: 'Good', color: '#22c55e', textClass: 'text-green' };
  if (aqi <= 40) return { label: 'Fair', color: '#84cc16', textClass: 'text-light-green' };
  if (aqi <= 60) return { label: 'Moderate', color: '#eab308', textClass: 'text-yellow' };
  if (aqi <= 80) return { label: 'Poor', color: '#f97316', textClass: 'text-orange' };
  if (aqi <= 100) return { label: 'Very Poor', color: '#ef4444', textClass: 'text-red' };
  return { label: 'Extremely Poor', color: '#7f1d1d', textClass: 'text-dark-red' };
};

/**
 * Formats a date string to a day name (e.g. 'Mon', 'Tue').
 */
export const getDayName = (dateString) => {
  const date = new Date(dateString);
  // Using UTC to avoid timezone shift issues since the API returns local timezone strings like "2023-10-25"
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' }).format(date);
};

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
