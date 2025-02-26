export interface OpenWeatherMapCitySearchResult {
  name: string;
  local_names: {
    [languageCode: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type OpenWeatherMapCitySearchResponse = OpenWeatherMapCitySearchResult[];

export interface CitySearchResult
  extends Omit<OpenWeatherMapCitySearchResult, "local_names"> {}

export type CitySearchResponse = CitySearchResult[];
