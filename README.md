# Weather App by Sindri Pétursson

This Weather App is a React-based application that provides real-time weather information and a 5-day forecast for any city, using the OpenWeatherMap API.

## Online Demo

Access a live version of the app: [Live Demo](https://weather-a1cf4.web.app/)

## Run app locally

Before running the app, you'll need to obtain an API key from OpenWeatherMap and set it up in the project.

### Obtaining the OpenWeatherMap API Key

1. **Sign Up**: Go to [OpenWeatherMap](https://openweathermap.org/) and sign up for an account.
2. **API Key**: Once registered, navigate to the API keys section in your account and generate a new API key.

### Setting Up the API Key

1. **Create a .env file**: In the root of the project, create a file named `.env`.
2. **Add API Key**: Inside the `.env` file, add the following line:

REACT_APP_WEATHER_API_KEY="Your_OpenWeatherMap_API_Key"
Replace `Your_OpenWeatherMap_API_Key` with the API key you obtained from OpenWeatherMap.

### Running the App

In the project directory, run:
- npm install
- npm start

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Instructions for Using the App

- **Search by City**: Users can enter a city name in the search input and click the search button to get weather information for that city.
- **Location-Based Search**: Users can also click the location button to get weather information based on their current geographical location.

## Extra features

- The app automatically switches to dark mode when displaying information for cities in their AM hours.

## Screenshots

![Screenshot 1](https://res.cloudinary.com/sindripet/image/upload/v1700418398/weatherapp/Weather1_qq3ulc.png)
![Screenshot 2](https://res.cloudinary.com/sindripet/image/upload/v1700418398/weatherapp/Weather2_tmu6hr.png)
![Screenshot 3](https://res.cloudinary.com/sindripet/image/upload/v1700418398/weatherapp/Weather3_bqnxzg.png)
![Screenshot 4](https://res.cloudinary.com/sindripet/image/upload/v1700418398/weatherapp/Weather4_ukhgxy.png)

## Resources

- Animations are provided from LottieFiles by jochang.
  [Weather animations](https://lottiefiles.com/vdr0uy2wwsoljqtc).

- Icons are provided from Flaticon by Freepik & Royyan Wijaya.
[Search](https://www.flaticon.com/free-icon/search_3031293?term=search&page=1&position=4&origin=search&related_id=3031293)
[Location](https://www.flaticon.com/free-icon/location_1008001?term=location&page=1&position=35&origin=search&related_id=1008001)
