import './style.css'

// Constantes
const API_KEY = "e7c373a53439ea9e7f81f7e9ac0bd075";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos en milisegundos

// Elementos del DOM
const loader = document.createElement("div");
const formEl = document.querySelector("form");
const spanEl = document.querySelector("span");
const weatherContainer = document.createElement("div");
const errorContainer = document.createElement("p");

// Configuración del loader
loader.classList.add("hidden", "animate-spin", "border-4", "border-blue-500", "border-t-transparent", "rounded-full", "w-8", "h-8", "mx-auto");
errorContainer.classList.add("text-red-500", "hidden", "mt-3");
weatherContainer.classList.add("mt-5", "p-4", "border", "rounded-lg");

// Añadir los elementos al body
document.body.appendChild(weatherContainer);
document.body.appendChild(errorContainer);

// Funciones principales

formEl?.addEventListener("submit", searchCityWeather);

// Función para manejar el envío del formulario
function searchCityWeather(event: Event) {
  event.preventDefault();
  const city = getCity(event);
  const sanitizedCity = sanitizeCity(city as string);
  const isValidCity = isCityValid(sanitizedCity);

  if (!isValidCity) {
    displayInvalidCityMessage(false);
    return;
  }

  // Verificar si los datos están en caché y son recientes
  const cityData = localStorage.getItem(sanitizedCity);
  if (cityData) {
    const { timestamp, data } = JSON.parse(cityData);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      console.log("✅ Usando datos en caché");
      displayWeatherData(data);
      return;
    }
  }

  // Si no hay datos recientes en caché, obtener nuevos
  getCityWeatherData(sanitizedCity);
  spanEl?.classList.add("hidden");
  showLoader();
}

// Funciones para manejar el loader
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// Funciones para la validación y sanitización de la ciudad

function getCity(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement);
  const formInputs = Object.fromEntries(formData.entries());
  return formInputs.city;
}

function sanitizeCity(cityValue: string) {
  return cityValue.trim().toLowerCase();
}

function isCityValid(cityValueSanitized: string) {
  return cityValueSanitized.length >= 2 && cityValueSanitized.length <= 100;
}

function displayInvalidCityMessage(isValidCity: boolean) {
  if (!isValidCity) {
    spanEl!.textContent = "Invalid";
    spanEl!.classList.add("text-red-500");
    spanEl!.classList.remove("hidden");
  }
}

// Funciones para la obtención de datos del clima

async function getCityWeatherData(city: string) {
  console.log("🔄 Fetching new data for:", city);

  try {
    const cityCoords = await getCityLatandLon(city);
    if (!cityCoords) throw new Error("❌ Coordenadas no encontradas");

    const { lat, lon } = cityCoords;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("❌ Ciudad no encontrada");

    const data = await response.json();
    localStorage.setItem(city, JSON.stringify({ timestamp: Date.now(), data }));

    console.log("✅ Datos obtenidos");
    displayWeatherData(data);
  } catch (error) {
    if (error instanceof Error) {
      displayErrorMessage(error.message);
    } else {
      displayErrorMessage("An unknown error occurred");
    }
  } finally {
    hideLoader();
  }
}

// Obtener las coordenadas de la ciudad
async function getCityLatandLon(city: string) {
  const geoResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  
  if (!geoResponse.ok) {
    console.error("Error en la solicitud:", geoResponse.statusText);
    return null;
  }

  const geoData = await geoResponse.json();
  
  if (!geoData || geoData.length === 0) {
    console.error("Ciudad no encontrada en la API de geolocalización.");
    return null;
  }

  return { lat: geoData[0].lat, lon: geoData[0].lon };
}
// Funciones para mostrar datos y errores

function displayWeatherData(data: any) {
  const weatherCondition = data.list[0].weather[0].main.toLowerCase(); // Soleado, Nublado, Lluvia
  const image = getWeatherImage(weatherCondition);
  
  document.body.style.backgroundImage = `url('images/${image}')`; // Cambiar fondo
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center center';
  document.body.style.height = '100vh';
  document.body.style.margin = '0';

  const cityName = data.city.name;
  const icon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

  weatherContainer.innerHTML = `
    <h2 class="text-3xl font-bold text-white">${cityName}</h2>
    <div class="flex justify-center items-center mt-2">
      <img src="${icon}" alt="Weather icon" class="w-24 h-24" />
      <p class="text-3xl font-semibold text-white">${(data.list[0].main.temp - 273.15).toFixed(1)}°C</p>
    </div>
    <p class="mt-2 text-lg text-white">${data.list[0].weather[0].description}</p>
    
    <!-- Detalles del clima -->
    <div class="mt-5 text-white">
      <p><strong>Humidity:</strong> ${data.list[0].main.humidity}%</p>
      <p><strong>Speed:</strong> ${data.list[0].wind.speed} m/s</p>
      <p><strong>Pressure:</strong> ${data.list[0].main.pressure} hPa</p>/**/
    </div>
    
    <!-- Pronóstico de 5 días -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
      ${data.list.slice(0, 5).map((forecast: any) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const temp = (forecast.main.temp - 273.15).toFixed(1);
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        return `
          <div class="bg-white p-4 rounded-lg shadow-lg">
            <p class="text-lg font-semibold">${date}</p>
            <img src="${icon}" alt="Icon" class="w-16 h-16 mx-auto" />
            <p class="text-center">${temp}°C</p>
            <p class="text-center text-sm">${forecast.weather[0].description}</p>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function displayErrorMessage(message: string) {
  errorContainer.textContent = message;
  errorContainer.classList.remove("hidden");
}

function getWeatherImage(weatherCondition: string) {
  const weatherImages: { [key: string]: string } = {
    clear: "soleado.jpeg",
    rain: "lluvioso.jpeg",
    clouds: "nublado.jpeg",
    snow: "nieve.jpeg",
    thunderstorm: "tormenta.jpeg"
  };

  // Si el clima no está en el mapa, usa una imagen por defecto
  return weatherImages[weatherCondition] || "default.jpg";
}
