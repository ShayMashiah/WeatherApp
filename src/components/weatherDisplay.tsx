import React from "react";

interface WeatherDisplayProps {
  weatherData: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="text-center mt-6">
      <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
      <p>{weatherData.current.temp_c}°C</p>
      <p>{weatherData.current.condition.text}</p>
      <img
        src={`https:${weatherData.current.condition.icon}`}
        alt={weatherData.current.condition.text}
      />
    </div>
  );
};

export default WeatherDisplay;
