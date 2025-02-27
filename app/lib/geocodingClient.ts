import { CitySearchResponse } from "../types/internal/geocoding";

export async function searchCities(query: string): Promise<CitySearchResponse> {
  const response = await fetch(
    `/api/geocoding?city=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search cities");
  }

  const data: CitySearchResponse = await response.json();

  return data;
}
