import { CitySearchResult } from "../types/internal/geocoding";
import { WeatherForecastResponse } from "../types/internal/weather";

export async function fetchWeatherData(city: CitySearchResult) {
  const response = await fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherForecastResponse = await response.json();

  return data;
}
