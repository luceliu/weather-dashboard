// hooks/useWeatherDashboard.ts
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { debounce } from "lodash";

import { fetchWeatherData } from "../lib/weatherClient";
import { searchCities } from "../lib/geocodingClient";
import {
  CitySearchResponse,
  CitySearchResult,
} from "../types/internal/geocoding";
import { WeatherForecastResponse } from "../types/internal/weather";

export function useWeatherDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CitySearchResponse>([]);
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(
    null
  );
  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const closeToast = () => {
    setShowToast(false);
  };

  const MIN_SEARCH_QUERY_LENGTH = 3;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchResults([]);

    if (!isValidSearch(searchQuery)) {
      setIsLoading(false);
      return;
    }

    debouncedFetchCities.cancel();
    setSelectedCity(null);
    setWeatherForecast(null);
    setIsLoading(true);
    performSearch(searchQuery);
  };

  const isValidSearch = (query: string): boolean => {
    return query.length >= MIN_SEARCH_QUERY_LENGTH;
  };

  const performSearch = async (searchTerm: string) => {
    try {
      const data = await searchCities(searchTerm);
      setSearchResults(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };
  // debounce 300ms for handling user input
  const debouncedFetchCities = useCallback(
    debounce(async (searchTerm: string) => {
      if (!isValidSearch(searchTerm)) {
        setIsLoading(false);
        return;
      }

      performSearch(searchTerm);
    }, 300),
    []
  );

  const handleCityAutoSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedCity(null);
    setWeatherForecast(null);
    setSearchResults([]);
    setIsLoading(true);
    debouncedFetchCities(value);
  };

  const handleCitySelect = async (city: CitySearchResult) => {
    setSelectedCity(city);

    try {
      const weatherData = await fetchWeatherData(city);
      setWeatherForecast(weatherData);
      setSearchQuery("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setShowToast(true);
    }
  };

  return {
    searchQuery,
    searchResults,
    selectedCity,
    weatherForecast,
    isLoading,
    error,
    showToast,
    closeToast,
    handleFormSubmit,
    handleCityAutoSearch,
    handleCitySelect,
    MIN_SEARCH_QUERY_LENGTH,
  };
}
