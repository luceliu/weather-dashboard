import * as React from "react";
import {
  CitySearchResponse,
  CitySearchResult,
} from "../types/internal/geocoding";

interface ICitySearchProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchQuery: string;
  handleCityAutoSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: CitySearchResponse;
  handleCitySelect: (city: CitySearchResult) => Promise<void>;
  minSearchQueryLength: number;
}

const CitySearch: React.FunctionComponent<ICitySearchProps> = ({
  handleFormSubmit,
  searchQuery,
  handleCityAutoSearch,
  searchResults,
  handleCitySelect,
  minSearchQueryLength,
}) => {
  return (
    <form className="relative mb-8" role="search" onSubmit={handleFormSubmit}>
      <div className="flex">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <input
          id="city-search"
          type="text"
          value={searchQuery}
          onChange={handleCityAutoSearch}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={!!searchResults}
          // TODO: implement keyboard navigation
          className="w-full px-4 py-2 rounded-l-md border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a city"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-r-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            searchQuery.length >= minSearchQueryLength
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={searchQuery.length < minSearchQueryLength}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {searchQuery && searchResults && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul id="search-results" role="listbox">
            {searchResults.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2  hover:bg-blue-50 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city.name}, {city.state ? `${city.state}, ` : ""}
                {city.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default CitySearch;
