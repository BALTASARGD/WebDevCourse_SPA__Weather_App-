# 🌦 Weather App - JavaScript & OpenWeather API

## 📌 Overview  
This is a weather application that allows users to check the weather of a given city. It fetches real-time data from the **OpenWeather API** and displays current conditions along with a 5-day forecast.

## ⚙️ Features  
✅ Fetches weather data using OpenWeather API.  
✅ Caches data in `localStorage` for **5 minutes** to optimize API calls.  
✅ Displays weather information, including temperature, humidity, wind speed, and pressure.  
✅ Dynamically updates the **background image** based on the weather condition.  
✅ Provides a **loader animation** while fetching data.  
✅ Shows error messages if the city is not found.  

## 📜 Code Structure  

### 1️⃣ **Constants & DOM Elements**  
- `API_KEY` → API key for OpenWeather.  
- `CACHE_EXPIRATION` → Cache duration (5 minutes).  
- **HTML elements** → Form, loader, weather container, error messages.

### 2️⃣ **Event Handling**  
- `searchCityWeather(event)` → Triggers on form submission, validates the city, and checks cached data.  
- If cached data is **valid**, it is used; otherwise, the API fetches new data.  

### 3️⃣ **Validation & Sanitization**  
- `sanitizeCity(cityValue)` → Removes extra spaces and converts the input to lowercase.  
- `isCityValid(cityValueSanitized)` → Ensures the city name is between **2 to 100 characters**.  

### 4️⃣ **Fetching Data**  
- `getCityWeatherData(city)` → Fetches **forecast data** using latitude & longitude.  
- `getCityLatandLon(city)` → Converts **city name** into latitude and longitude using OpenWeather's geolocation API.  

### 5️⃣ **Displaying Data**  
- `displayWeatherData(data)` → Renders weather info, including:  
  - **City name, temperature, weather description**  
  - **Weather icon, humidity, wind speed, pressure**  
  - **5-day weather forecast in a grid format**  
- Background image dynamically updates based on weather conditions.  

### 6️⃣ **Error Handling**  
- `displayErrorMessage(message)` → Displays error messages when a city is not found or an API request fails.  
- If an unknown error occurs, a generic error message is shown.  

### 7️⃣ **Helper Functions**  
- `getWeatherImage(weatherCondition)` → Returns an appropriate **background image** for different weather conditions:  
  - ☀️ `clear` → sunny.jpeg  
  - 🌧️ `rain` → rainy.jpeg  
  - ☁️ `clouds` → cloudy.jpeg  
  - ❄️ `snow` → snowy.jpeg  
  - ⛈️ `thunderstorm` → stormy.jpeg  
  - Default → `default.jpg`  

## 🛠️ Technologies Used  
- **JavaScript (ES6+)**
- **OpenWeather API**
- **TailwindCSS (for styling)**  
- **LocalStorage (for caching)**  

## 🎯 How It Works  
1️⃣ Enter a **city name** in the form.  
2️⃣ The app **validates** the input and checks cache storage.  
3️⃣ If no cached data, it **fetches new data** from OpenWeather API.  
4️⃣ The weather details are **displayed dynamically**.  
5️⃣ The background updates based on the **current weather condition**.  

---

This summary provides a structured **Markdown** representation of your code, making it easier to understand! 🚀 Let me know if you need modifications. 😊
