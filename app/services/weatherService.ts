import {
  OpenWeatherMapCurrentWeather,
  OpenWeatherMapDailyWeather,
  OpenWeatherMapResponse,
  SingleDayWeather,
  WeatherForecastResponse,
} from "../types/weather";

export async function fetchWeatherData(
  lat: string,
  lon: string
): Promise<WeatherForecastResponse> {
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is missing");
  }

  const externalApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`;

  const res = await fetch(externalApiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`OpenWeatherMap API error: ${res.statusText}`);
  }

  const data: OpenWeatherMapResponse = await res.json();

  // remove all the unneeded keys from the external API response
  const transformedData = transformOpenWeatherMapData(data);

  return transformedData;
}

const transformOpenWeatherMapData = (
  data: OpenWeatherMapResponse
): WeatherForecastResponse => {
  const currentWeather = transformCurrentOrDailyWeather(data.current);
  const dailyWeather = data.daily.map(transformCurrentOrDailyWeather);

  return {
    currentWeather,
    dailyWeather,
  };
};

const transformCurrentOrDailyWeather = (
  singleDayData: OpenWeatherMapCurrentWeather | OpenWeatherMapDailyWeather
): SingleDayWeather => {
  const temperature =
    typeof singleDayData.temp === "number"
      ? singleDayData.temp // OpenWeatherMapCurrentWeather
      : singleDayData.temp.day; // OpenWeatherMapDailyWeather

  return {
    dt: singleDayData.dt,
    temp: temperature,
    description: singleDayData.weather[0].description,
    iconId: singleDayData.weather[0].icon,
  };
};
