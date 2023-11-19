import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { fetchWeatherData } from "../services/weatherService";
import { formatDate } from "../utils/dateUtils";
import { getLocalTimeForTimezone } from "../utils/timeUtils";
import getWeatherAnimation from "../utils/getWeatherAnimation";
import "../styles/weatherStyles.css";
import searchIcon from "../assets/icons/search.png";
import locationIcon from "../assets/icons/location.png";
import loadingAnimation from "../assets/lotties/loading.json";

const WeatherComponent = () => {
	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [searchString, setSearchString] = useState("Reykjavik");
	const [city, setCity] = useState("Reykjavik");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [timeZone, setTimeZone] = useState(0);
	const [localTime, setLocalTime] = useState("");
	const [nightMode, setNightMode] = useState(false);

	/* Fetch Weather with default searchString on reload */
	useEffect(() => {
		fetchWeather();
	}, []);

	/* Fetch weather based on users location */
	const fetchWeatherOnLocation = () => {
		setIsLoading(true);
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setErrorMessage("");
					fetchWeather(latitude, longitude);
				},
				() => {
					setErrorMessage(
						"Sorry, we could not get the weather based on your location"
					);
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	/* Fetch weather based on search string */
	const fetchWeather = async (latitude = null, longitude = null) => {
		setIsLoading(true);
		try {
			let data;
			if (latitude && longitude) {
				// Get weather by location
				data = await fetchWeatherData(null, latitude, longitude);
			} else {
				// Get weather by search
				data = await fetchWeatherData(searchString, null, null);
			}
			setCity(data.current.name);
			setWeather(data.current);
			setTimeZone(data.current.timezone);
			setForecast(getDailyForecast(data.forecast));
			setErrorMessage("");
		} catch (error) {
			setErrorMessage("Sorry, we couldn't find a city with that name");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getDailyForecast = (forecastData) => {
		const dailyData = {};
		forecastData.list.forEach((item) => {
			const date = new Date(item.dt * 1000).toLocaleDateString();
			if (!dailyData[date]) {
				dailyData[date] = item;
			}
		});
		return Object.values(dailyData);
	};

	// Update local time when local timeZone updates
	useEffect(() => {
		const localTimeString = getLocalTimeForTimezone(timeZone);
		setLocalTime(localTimeString);

		// Set nightmode when time is AM - Changes colors and animations
		const isNight = localTimeString.includes("AM");
		setNightMode(isNight);
	}, [timeZone]);

	return (
		<div className={`weatherComponent ${nightMode ? "NMBackground" : ""}`}>
			<div className={"searchContainer"}>
				<div>
					{isLoading ? (
						<Lottie
							className={"loadingIcon"}
							animationData={loadingAnimation}
							loop={true}
						/>
					) : (
						<p className={"errorMessage"}>{errorMessage}</p>
					)}
				</div>
				<div>
					<input
						type="text"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						placeholder="Enter city name"
						maxLength={100}
						className={`${nightMode ? "NMPrimary" : ""}`}
					/>
					<button
						className={`${nightMode ? "NMPrimary" : ""}`}
						onClick={() => fetchWeather()}
					>
						<img src={searchIcon} alt="searchIcon" />
					</button>
					<button
						className={`${nightMode ? "NMPrimary" : ""}`}
						onClick={fetchWeatherOnLocation}
					>
						<img src={locationIcon} alt="locationIcon" />
					</button>
				</div>
			</div>

			<div className={`container dayContainer ${nightMode ? "NMPrimary" : ""}`}>
				{weather && weather.main && weather.weather && (
					<div className={"today"}>
						<div className="todayCity">
							<div className={"dayDate"}>
								<h2>{formatDate(new Date())}</h2>
							</div>
							<div className={"dayLocation"}>
								<h1>{city}</h1>
								<h2>{localTime}</h2>
							</div>
						</div>
						<div className="todayInfo">
							<div>
								<div className="infoItem">
									<h2>{weather.main.temp.toFixed(1)}°C</h2>
									<h2>Temperature</h2>
								</div>
								<div className="infoItem">
									<Lottie
										className={"todayIcon"}
										animationData={getWeatherAnimation(
											weather.weather[0].main,
											nightMode
										)}
										loop={true}
									/>
								</div>
								<div className="infoItem">
									<h1>{weather.weather[0].main}</h1>
								</div>
							</div>
							<div>
								<div className="infoItem">
									<h2>{weather.main.feels_like.toFixed(1)}°C</h2>
									<h2>Feels like</h2>
								</div>
								<div className="infoItem">
									<h2>{weather.main.humidity}%</h2>
									<h2>Humidity</h2>
								</div>
								<div className="infoItem">
									<h2>{weather.wind.speed}m/s</h2>
									<h2>Wind speed</h2>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div
				className={`container forecastContainer ${
					nightMode ? "NMPrimary" : ""
				}`}
			>
				{forecast &&
					forecast.map((item, index) => (
						<div className={"eachDay"} key={index}>
							<div className={"eachDayDate"}>
								<h2>{formatDate(item.dt, true)}</h2>
							</div>
							<div className="eachDayWeather">
								<div className="eachDayInfo">
									<h2>{item.main.temp.toFixed(1)}°C</h2>
									<h2>T</h2>
								</div>
								<div className="eachDayInfo">
									<Lottie
										className={"forecastIcon"}
										animationData={getWeatherAnimation(
											item.weather[0].main,
											nightMode
										)}
										loop={true}
									/>
								</div>
								<div className="eachDayInfo">
									<h2>{item.weather[0].main}</h2>
								</div>
							</div>
							<div className={"eachDayMesurement"}>
								<div className="eachDayInfo">
									<h2>{item.main.feels_like.toFixed(1)}°C</h2>
									<h2>F</h2>
								</div>
								<div className="eachDayInfo">
									<h2>{item.main.humidity}%</h2>
									<h2>H</h2>
								</div>
								<div className="eachDayInfo">
									<h2>{item.wind.speed.toFixed(1)}m/s</h2>
									<h2>W</h2>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default WeatherComponent;
