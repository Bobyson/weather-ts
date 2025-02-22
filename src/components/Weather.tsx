import {motion} from 'framer-motion'
import { WeatherData } from '../types/weather'

interface WeatherProps {
  data: WeatherData | null;
}

const Weather = ({ data }: WeatherProps) => {
  if (!data || !data.currentConditions) {
    return <div>Loading weather data...</div>;
  }

  const currentWeather = data.currentConditions;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-gray-600 p-8"
    >
      <div className='bg-gradient-to-br from-blue-500 to-blue-800 p-8 shadow-lg rounded-lg'>
        <div className="text-center mb-6">
          <h2 className='text-2xl font-bold text-white'>{data.address}</h2>
          <p className='text-white'>Today's Weather</p>
        </div>

        <div className='bg-white/10 rounded-2xl p-6 mb-6 text-center'>
          <div className='text-5xl font-bold text-white mb-2'>
            {currentWeather.temp} °C
          </div>
          <div className='text-xl text-white/90'>
            {currentWeather.conditions}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-white/10 rounded-xl p-4 flex flex-col items-center'>
            <svg className="w-6 h-6 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <p className='text-sm text-white/80'>Wind Speed</p>
            <p className='text-lg font-semibold text-white'>{currentWeather.windspeed} km/h</p>
          </div>

          <div className='bg-white/10 rounded-xl p-4 flex flex-col items-center'>
            <svg className="w-6 h-6 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <p className='text-sm text-white/80'>Chance of Rain</p>
            <p className='text-lg font-semibold text-white'>{currentWeather.precipprob} %</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-block bg-white/10 rounded-full px-4 py-2">
            <span className="text-white">
              {getWeatherEmoji(currentWeather.conditions)}
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