import "../App.css";
import WeatherDisplay from "../src/components/weatherDisplay";

import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");

  const handleClick = async () => {};

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
          // onClick={}
        >
          🔍
        </button>
      </div>

      {/* <WeatherDisplay weatherData={} /> */}
    </>
  );
}

export default App;
