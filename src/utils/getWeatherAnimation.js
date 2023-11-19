/*
Animation to visualize the current weather
Animations from: https://lottiefiles.com/vdr0uy2wwsoljqtc
*/

import sun from "../assets/lotties/sun.json";
import clouds from "../assets/lotties/clouds.json";
import rain from "../assets/lotties/rain.json";
import snow from "../assets/lotties/snow.json";

import mist from "../assets/lotties/mist.json";

import night from "../assets/lotties/night.json";
import cloudsNight from "../assets/lotties/cloudsnight.json";
import rainNight from "../assets/lotties/rainnight.json";
import snowNight from "../assets/lotties/snownight.json";

const getWeatherAnimation = (weatherMain, nightMode) => {
	switch (weatherMain) {
		case "Clear":
			return nightMode ? night : sun;
		case "Clouds":
			return nightMode ? cloudsNight : clouds;
		case "Rain":
			return nightMode ? rainNight : rain;
		case "Snow":
			return nightMode ? snowNight : snow;
		case "Mist":
			return mist;
		default:
			return nightMode ? night : sun;
	}
};

export default getWeatherAnimation;
