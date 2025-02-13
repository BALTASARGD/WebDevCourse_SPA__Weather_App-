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
      displa// Funciones para la obtención de datos del clima

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
          localStoyErrorMessage(error.message);
    } else {
      displayErrorMessage("An unknown error occurred");
    }
  } finally {
    hideLoader();
  }
}
