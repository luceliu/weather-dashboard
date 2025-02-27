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
