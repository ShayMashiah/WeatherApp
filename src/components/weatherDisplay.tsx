import React from "react";

interface WeatherDisplayProps {
  weatherData: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="flex justify-center mt-6">
      <div className="text-center border border-white rounded-lg p-6 max-w-sm w-full bg-opacity-20 backdrop-blur-md bg-white/20 dark:bg-gray-800/30">

        <h2 className="text-2xl font-semibold text-white mb-2">
          {weatherData.location.name}, {weatherData.location.country}
        </h2>
        <p className="text-3xl text-white mb-2">{weatherData.current.temp_c}°C</p>
        
        <p className="text-white mb-4">{weatherData.current.condition.text}</p>
           
        <img
          src={`https:${weatherData.current.condition.icon}`}
          alt={weatherData.current.condition.text}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;
