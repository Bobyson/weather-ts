import { useEffect, useState } from 'react'
import { config } from './config/config'
import './App.css'


const App = () => {
  const [location, setLocation] = useState<{lat: number, lon: number} | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
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
      const url = `${config.API_URL}/${location.lat},${location.lon}?unitGroup=metric&key=${config.API_KEY}&contentType=json`;

      try {
        const response = await fetch(url);
        const data = response.json();
        console.log(data);
        setWeatherData(data)
        
      } catch (error) {
        setError("Failed to fetch weather data");
      }
    }

    fetchWeather();
  },[location]);

  return (
    <div>
      <h1>Weather Web App</h1>
    </div>
  )
}

export default App
