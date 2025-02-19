import { useEffect, useState } from 'react'
import { config } from './config/config'
import { Tommorow, Search, Weather, Yesterday } from './components'
import './App.css'

interface WeatherData {
  address: string;
  currentConditions: {
    temp: number;
    // add other properties as needed
  };
}

const App = () => {
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        setLocation({lat: position.coords.latitude, lon: position.coords.longitude});
      },
      (error)=> {
        setError("Location denied. Please allow location.")
      }
    )
  },[])

  useEffect(()=> {
    if(!location) return

    const fetchWeather = async() => {
      const url = `${config.API_URL}/${location.lat},${location.lon}?unitGroup=metric&key=${config.API_KEY}&contentType=json&include=current`;

      try {
        // Get location name using Nominatim
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}`;
        const nominatimResponse = await fetch(nominatimUrl, {
          headers: {
            'User-Agent': 'WeatherWebApp/1.0' // Required by Nominatim's terms of use
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
        setError("Failed to fetch weather data");
      }
    }

    fetchWeather();
  },[location]);

  return (
    <div>
      <h1>Weather Web App</h1>
      <Search data={weatherData}/>
      <Weather data={weatherData}/>
      <Yesterday data={weatherData}/>
      <Tommorow data={weatherData}/>
    </div>
  )
}

export default App
