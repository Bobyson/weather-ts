import { motion } from 'framer-motion'
import { WeatherData } from '../types/weather'

interface ForecastProps {
  data: WeatherData | null;
}

const Forecast = ({ data }: ForecastProps) => {
  if (!data) return null;

  const yesterdayWeather = data.days[0];  // First day in the array is yesterday
  const tomorrowWeather = data.days[2];   // Third day is tomorrow (since we start from yesterday)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Yesterday's Weather */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Yesterday</h2>
          {yesterdayWeather && (
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-white">{yesterdayWeather.temp}°C</p>
                <p className="text-lg text-white/90">{yesterdayWeather.conditions}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-sm text-white/80">Wind Speed</p>
                  <p className="text-lg font-semibold text-white">{yesterdayWeather.windspeed} km/h</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-sm text-white/80">Precipitation</p>
                  <p className="text-lg font-semibold text-white">{yesterdayWeather.precipprob}%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tomorrow's Weather */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Tomorrow</h2>
          {tomorrowWeather && (
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-white">{tomorrowWeather.temp}°C</p>
                <p className="text-lg text-white/90">{tomorrowWeather.conditions}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-sm text-white/80">Wind Speed</p>
                  <p className="text-lg font-semibold text-white">{tomorrowWeather.windspeed} km/h</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-sm text-white/80">Precipitation</p>
                  <p className="text-lg font-semibold text-white">{tomorrowWeather.precipprob}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 

export default Forecast;