import "./App.css";
import WeatherDisplay from "../src/components/weatherDisplay";
import HistoryButton from "../src/components/historyButton";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleClick = async (cityName: string = city) => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
      );
      setWeatherData(response.data);

      setSearchHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        if (!updatedHistory.includes(city)) {
          updatedHistory.push(city);
        }
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
            );
            setWeatherData(response.data);
          } catch (error) {
            console.error("Failed to fetch weather by location", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [API_KEY]);

  return (
    <>
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-center mb-8">
        Weather App
      </h1>

      <div className="flex items-center justify-center w-full max-w-lg mx-auto mb-8">
        <div className="flex w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for a city..."
            className="w-full px-6 py-3 text-gray-800 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 rounded-l-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className=" bg-gray-700 hover:bg-gray-800 text-white px-3 py-3  transition-colors"
            onClick={() => handleClick()}
          >
            🔍
          </button>
          <HistoryButton
            history={searchHistory}
            onSelect={(selectedCity) => {
              setCity(selectedCity);
              handleClick(selectedCity);
            }}
          />
        </div>
      </div>

      <WeatherDisplay weatherData={weatherData} />
    </>
  );
}

export default App;
