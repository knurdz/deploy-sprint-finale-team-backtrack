import { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';

interface WeatherData {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  provider: string;
  configured?: boolean;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch('./api/weather.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setWeather(data))
      .catch(() => null);
  }, []);

  if (!weather || !weather.city) return null;

  return (
    <div className="sidebarPanel">
      <Cloud size={18} />
      <div>
        <strong>{weather.city} Weather</strong>
        <p>
          {weather.temp}°C — {weather.description}
        </p>
        <p>
          Humidity: {weather.humidity}%
        </p>
        <small style={{ opacity: 0.75 }}>Provider: {weather.provider}</small>
      </div>
    </div>
  );
}
