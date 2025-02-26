import { OpenWeatherMapCitySearchResponse } from "../types/geocoding";

export async function fetchCitiesData(city: string) {
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is missing");
  }

  const externalApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  const res = await fetch(externalApiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.statusText}`);
  }
  const data: OpenWeatherMapCitySearchResponse = await res.json();

  return data;
}
