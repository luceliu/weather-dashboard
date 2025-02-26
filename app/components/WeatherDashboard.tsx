"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";
import { CitySearchResponse, CitySearchResult } from "../types/geocoding";
import { WeatherForecastResponse } from "../types/weather";
import Image from "next/image";
import { format, fromUnixTime } from "date-fns";

const WeatherDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CitySearchResponse>([]);
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(
    null
  );
  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // debounce 300ms for handling user input
  const debouncedFetchCities = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 3) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/geocoding?city=${encodeURIComponent(searchTerm)}`
        );
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data: CitySearchResponse = await response.json();

        setSearchResults(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleCitySearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedCity(null);
    setWeatherForecast(null);
    setIsLoading(true);
    debouncedFetchCities(value);
  };

  const handleCitySelect = async (city: CitySearchResult) => {
    try {
      const response = await fetch(
        `/api/weather?lat=${city.lat}&lon=${city.lon}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather");
      const data = await response.json();
      setWeatherForecast(data);
      setSelectedCity(city);
      setSearchQuery("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDayAndDate = (unixTime: number) => {
    const date = fromUnixTime(unixTime);
    return {
      dayOfWeek: format(date, "E"),
      date: format(date, "MMM dd"),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-12">
          {/* <h1 className="text-4xl font-bold mb-6">Weather Dashboard</h1> */}

          {/* Search Box */}
          <div className="relative mb-8">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleCitySearch}
                // onKeyDown={(e) => e.key === 'Enter' && handleCitySearch()}
                className="w-full px-4 py-2 rounded-l-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for a city..."
              />
              {/* <button 
                onClick={handleCitySearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                <Search className="w-5 h-5" />
              </button> */}
            </div>

            {/* Search Results */}
            {searchQuery && !selectedCity && searchResults && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((city, index) => (
                  <div
                    key={index}
                    className="px-4 py-2  hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}, {city.state ? `${city.state}, ` : ""}
                    {city.country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedCity && weatherForecast ? (
            <div>
              {/* Current Weather */}
              <h2 className="text-3xl font-bold my-6">
                {selectedCity.name},{" "}
                {selectedCity.state ? `${selectedCity.state}, ` : ""}
                {selectedCity.country}
              </h2>

              <div className="mb-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center p-4">
                  <div>
                    <div className="">
                      <p className="text-2xl">Today</p>
                      <h3 className="text-6xl font-bold my-2">
                        {Math.round(weatherForecast.currentWeather.temp)} °C
                      </h3>
                      <p className="text-xl">
                        {weatherForecast.currentWeather.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-white bg-opacity-20 p-3 rounded-full">
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherForecast.currentWeather.iconId}@2x.png`}
                      alt="current conditions"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>

              {/* Forecast */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">5-Day Forecast</h3>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                  {weatherForecast.dailyWeather.map((day, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 rounded-lg p-4 text-center flex flex-col items-center"
                    >
                      <p className="font-semibold text-xl">
                        {getDayAndDate(day.dt).dayOfWeek}
                      </p>
                      <div className="flex w-fit items-center justify-center bg-white bg-opacity-100 p-3 m-3 rounded-full">
                        <Image
                          src={`https://openweathermap.org/img/wn/${day.iconId}@2x.png`}
                          alt="weather conditions"
                          width={75}
                          height={75}
                        />
                      </div>
                      <p className="text-xl font-semibold m-1">
                        {Math.round(day.temp)}°C
                      </p>
                      <p className="">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 ">
              <p className="text-lg">
                Search for a city to see its weather forecast!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
