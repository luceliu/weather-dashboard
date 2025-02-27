"use client";

import Toast from "./Toast";
import Forecast from "./Forecast";
import CurrentWeather from "./CurrentWeather";
import CitySearch from "./CitySearch";
import { useWeatherDashboard } from "../hooks/useWeatherDashboard";
import { CitySearchResult } from "../types/internal/geocoding";

const CityHeader: React.FC<{ selectedCity: CitySearchResult }> = ({
  selectedCity,
}) => {
  return (
    <h2 className="text-3xl font-bold my-6">
      {selectedCity.name}, {selectedCity.state ? `${selectedCity.state}, ` : ""}
      {selectedCity.country}
    </h2>
  );
};

const WeatherDashboard: React.FC = () => {
  const {
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
  } = useWeatherDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <Toast
        message={error}
        isVisible={showToast}
        onClose={closeToast}
        type="error"
      />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-12">
          <CitySearch
            handleFormSubmit={handleFormSubmit}
            searchQuery={searchQuery}
            handleCityAutoSearch={handleCityAutoSearch}
            searchResults={searchResults}
            handleCitySelect={handleCitySelect}
            minSearchQueryLength={MIN_SEARCH_QUERY_LENGTH}
          />
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedCity && weatherForecast ? (
            <div>
              <CityHeader selectedCity={selectedCity} />

              <CurrentWeather currentWeather={weatherForecast.currentWeather} />

              <Forecast forecast={weatherForecast.dailyWeather} />
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
