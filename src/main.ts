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
