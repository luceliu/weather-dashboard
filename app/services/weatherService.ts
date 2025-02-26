import { WeatherForecastResponse } from "../types/weather";

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

  const data = await res.json();

  return data;
}
