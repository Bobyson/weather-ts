import React from 'react'
import {motion} from 'framer-motion'

interface CurrentConditions {
  temp: number;
  // ... you can add other weather properties here as needed
}

interface WeatherData {
  address: string;
  currentConditions: CurrentConditions;
}

interface WeatherProps {
  data: WeatherData | null;
}

const Weather: React.FC<WeatherProps> = ({data}) => {
  console.log("Weather Data (full object):", JSON.stringify(data, null, 2));
  
  if (!data || !data.currentConditions) {
    return <div>Loading weather data...</div>;
  }

  console.log("Current Conditions:", data.currentConditions);
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-600 p-8"
    >
    <div className='bg-gradient-to-br from-blue-500 to-blue-800 p-8 shadow-lg'>
      <div className="text-center mb-6">
        <h2 className='text-2xl font-bold text-white'>{data.address}</h2>
        <p className='text-white'>Today's Weather</p>
      </div>

      <div className='bg-white/10 rounded-2xl p-6 mb-6 text-center'>
        <div className='text-5xl font-bold text-white mb-2'>
          {data.currentConditions.temp} °C
        </div>
        <div className='text-xl text-white/90'>
          {data.currentConditions.conditions}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        {/*{windSpeed} */}
        <div className='bg-white/10 rounded-xl p-4 flex flex-col items-center'>
        <svg className="w-6 h-6 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          <p className='text-sm text-white/80'>Wind Speed</p>
          <p className='text-lg font-semibold text-white'>{data.currentConditions.windspeed} km/h</p>
        </div>

        {/*{chanceOfRain} */}
        <div className='bg-white/10 rounded-xl p-4 flex flex-col items-center'>
        <svg className="w-6 h-6 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          <p className='text-sm text-white/80'>Chance of Rain</p>
          <p className='text-lg font-semibold text-white'>{data.currentConditions.precipprob} %</p>
        </div>
      </div>

      {/* Weather Icon and Condition */}
      <div className="mt-6 text-center">
          <div className="inline-block bg-white/10 rounded-full px-4 py-2">
            <span className="text-white">
              {getWeatherEmoji(data.currentConditions.conditions)} {/* You'll need to implement this function */}
            </span>
          </div>
        </div>
    </div>
    </motion.div>
  )
}

const getWeatherEmoji = (condition: string): string => {
  const conditions = condition.toLowerCase();
  if (conditions.includes('sunny') || conditions.includes('clear')) return '☀️';
  if (conditions.includes('cloud')) return '☁️';
  if (conditions.includes('rain')) return '🌧️';
  if (conditions.includes('storm')) return '⛈️';
  if (conditions.includes('snow')) return '🌨️';
  return '🌤️';
}

export default Weather