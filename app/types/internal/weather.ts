export interface WeatherForecastResponse {
  currentWeather: SingleDayWeather;
  dailyWeather: SingleDayWeather[];
  timezoneOffset: number;
}

export interface SingleDayWeather {
  dt: number;
  temp: number;
  description: string;
  iconId: string;
}
