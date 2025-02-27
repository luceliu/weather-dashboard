import { OpenWeatherMapCitySearchResult } from "../external/openWeatherMapGeocoding";

export interface CitySearchResult
  extends Omit<OpenWeatherMapCitySearchResult, "local_names"> {}

export type CitySearchResponse = CitySearchResult[];
