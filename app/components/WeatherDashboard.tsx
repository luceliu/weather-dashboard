"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";

interface IWeatherDashboardProps {}

const WeatherDashboard: React.FunctionComponent<IWeatherDashboardProps> = (
  props
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
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
        const data = await response.json();

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
    setIsLoading(true);
    debouncedFetchCities(value);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Weather Dashboard
          </h1>

          {/* Search Box */}
          <div className="relative mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleCitySearch}
                // onKeyDown={(e) => e.key === 'Enter' && handleCitySearch()}
                className="w-full px-4 py-2 rounded-l-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    key={city.index}
                    className="px-4 py-2 text-black hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}, {city.country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedCity ? (
            <div>
              {/* Current Weather */}
              <div className="mb-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCity.name}</h2>
                    {/* <p className="text-lg opacity-90">{mockWeatherData.current.weather}</p> */}
                    <div className="mt-4">
                      <p className="text-5xl font-bold">°C</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-white bg-opacity-20 p-3 rounded-full">
                    Current Weather
                  </div>
                </div>
              </div>

              {/* Forecast */}
              {/* <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">5-Day Forecast</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {mockWeatherData.forecast.map((day, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="font-semibold text-gray-700">{day.day}</p>
                      <div className="my-2 flex justify-center">
                        {getWeatherIcon(day.weather)}
                      </div>
                      <p className="text-xl font-bold text-gray-800">{day.temp}°C</p>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              {/* <CloudSun className="w-16 h-16 mb-2 text-blue-400" /> */}
              <p className="text-lg">
                Search for a city to see the weather forecast
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
