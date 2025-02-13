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
