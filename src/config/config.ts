export const config = {
    API_KEY: String(import.meta.env.VITE_WEATHER_API_KEY), 
    API_URL: String(import.meta.env.VITE_WEATHER_URL),
    PLACES_API_KEY: String(import.meta.env.VITE_PLACES_API_KEY)
};