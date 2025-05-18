import "./App.css";
import WeatherDisplay from "../src/components/weatherDisplay";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleClick = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data);
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
            console.log(response.data);
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
      <h1>Weather App</h1>
      <div className="flex items-center max-w-md mx-auto mt-4">
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full px-4 py-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
          onClick={handleClick}
        >
          🔍
        </button>
      </div>

      <WeatherDisplay weatherData={weatherData} />
    </>
  );
}

export default App;
