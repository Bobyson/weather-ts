export interface WeatherData {
  address: string;
  days: Array<{
    temp: number;
    conditions: string;
    windspeed: number;
    precipprob: number;
    datetime: string;
  }>;
  currentConditions: {
    temp: number;
    conditions: string;
    windspeed: number;
    precipprob: number;
    datetime: string;
  };
} 