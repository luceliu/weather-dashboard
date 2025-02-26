export interface OpenWeatherMapResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: OpenWeatherMapCurrentWeather;
  daily: OpenWeatherMapDailyWeather[];
}

export interface OpenWeatherMapCurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  rain?: number;
  snow?: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: OpenWeatherMapWeather[];
}

export interface OpenWeatherMapDailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: OpenWeatherMapTemperature;
  feels_like: OpenWeatherMapFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: OpenWeatherMapWeather[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface OpenWeatherMapTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OpenWeatherMapFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OpenWeatherMapWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherForecastResponse {
  currentWeather: SingleDayWeather;
  dailyWeather: SingleDayWeather[];
}

export interface SingleDayWeather {
  dt: number;
  temp: number;
  description: string;
  iconId: string;
}
