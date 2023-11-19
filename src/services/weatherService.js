/* API call to openweathermap.org */
import axios from "axios";

const fetchWeatherData = async (city, latitude, longitude) => {
	const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
	let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
	let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

	if (city) {
		weatherUrl += `&q=${city}`;
		forecastUrl += `&q=${city}`;
	} else if (latitude && longitude) {
		weatherUrl += `&lat=${latitude}&lon=${longitude}`;
		forecastUrl += `&lat=${latitude}&lon=${longitude}`;
	}

	try {
		const weatherResponse = await axios.get(weatherUrl);
		const forecastResponse = await axios.get(forecastUrl);
		return { current: weatherResponse.data, forecast: forecastResponse.data };
	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw error;
	}
};

export { fetchWeatherData };
