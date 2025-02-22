import { useEffect, useState } from 'react'
import { config } from './config/config'
import { Search, Weather, Forecast } from './components'
import { WeatherData } from './types/weather'
import './App.css'

const App = () => {
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user's location on initial load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        setError(`Location denied: ${error.message}`);
      }
    );
  }, []);

  // Handle city search
  const handleSearch = async (city: string) => {
    try {
      // Convert city name to coordinates using Nominatim
      const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'WeatherWebApp/1.0'
        }
      });
      const data = await response.json();

      if (data.length === 0) {
        setError('City not found. Please try another location.');
        return;
      }

      // Use the first result's coordinates
      setLocation({
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      });
      setError(null);
    } catch (error) {
      setError('Failed to search location. Please try again.');
    }
  };

  // Fetch weather data whenever location changes
  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      const url = `${config.API_URL}/${location.lat},${location.lon}/${yesterdayStr}/${tomorrowStr}?unitGroup=metric&key=${config.API_KEY}&contentType=json&include=current`;

      try {
        // Get location name
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}`;
        const nominatimResponse = await fetch(nominatimUrl, {
          headers: {
            'User-Agent': 'WeatherWebApp/1.0'
          }
        });
        const nominatimData = await nominatimResponse.json();
        const locationName = nominatimData.display_name.split(',').slice(0, 2).join(',');

        const response = await fetch(url);
        const data = await response.json();
        
        setWeatherData({
          ...data,
          address: locationName
        });
      } catch (error) {
        setError(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Weather Web App</h1>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg mb-6">{error}</div>}
        <Search onSearch={handleSearch} />
        <Weather data={weatherData} />
        <Forecast data={weatherData} />
      </div>
    </div>
  );
};

export default App;
