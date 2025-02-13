# 🌦 Aplicación del Clima - JavaScript & OpenWeather API

## 📌 Resumen  
Esta es una aplicación de clima que permite a los usuarios consultar el clima de una ciudad específica. Obtiene datos en tiempo real de la **API de OpenWeather** y muestra las condiciones actuales junto con un pronóstico de 5 días.

## ⚙️ Características  
✅ Obtiene datos meteorológicos utilizando la API de OpenWeather.  
✅ Almacena los datos en **localStorage** por **5 minutos** para optimizar llamadas a la API.  
✅ Muestra información del clima, incluyendo temperatura, humedad, velocidad del viento y presión.  
✅ Cambia dinámicamente el **fondo** según la condición climática.  
✅ Muestra un **loader animado** mientras obtiene los datos.  
✅ Muestra mensajes de error si la ciudad no se encuentra.  

## 📜 Estructura del Código  

### 1️⃣ **Constantes y Elementos del DOM**  
- `API_KEY` → Clave de la API de OpenWeather.  
- `CACHE_EXPIRATION` → Duración de la caché (5 minutos).  
- **Elementos HTML** → Formulario, loader, contenedor de clima, mensajes de error.  

### 2️⃣ **Manejo de Eventos**  
- `searchCityWeather(event)` → Se ejecuta cuando el usuario envía el formulario.  
  - **Valida** la ciudad y verifica si los datos están en caché.  
  - Si hay datos **válidos en caché**, los usa; si no, obtiene nuevos datos de la API.  

### 3️⃣ **Validación y Sanitización**  
- `sanitizeCity(cityValue)` → Elimina espacios extra y convierte la entrada en minúsculas.  
- `isCityValid(cityValueSanitized)` → Verifica que el nombre de la ciudad tenga entre **2 y 100 caracteres**.  

### 4️⃣ **Obtención de Datos**  
- `getCityWeatherData(city)` → Obtiene datos del **pronóstico** usando latitud y longitud.  
- `getCityLatandLon(city)` → Convierte el **nombre de la ciudad** en coordenadas (latitud y longitud) usando la API de geolocalización de OpenWeather.  

### 5️⃣ **Mostrar Datos**  
- `displayWeatherData(data)` → Muestra la información meteorológica, incluyendo:  
  - **Nombre de la ciudad, temperatura, descripción del clima**  
  - **Ícono del clima, humedad, velocidad del viento, presión**  
  - **Pronóstico de 5 días en formato de cuadrícula**  
- La imagen de fondo se actualiza dinámicamente según la condición climática.  

### 6️⃣ **Manejo de Errores**  
- `displayErrorMessage(message)` → Muestra un mensaje de error si la ciudad no se encuentra o si hay un fallo en la API.  
- Si ocurre un error desconocido, se muestra un mensaje genérico.  

### 7️⃣ **Funciones Auxiliares**  
- `getWeatherImage(weatherCondition)` → Devuelve una **imagen de fondo** adecuada según la condición climática:  
  - ☀️ `clear` → soleado.jpeg  
  - 🌧️ `rain` → lluvioso.jpeg  
  - ☁️ `clouds` → nublado.jpeg  
  - ❄️ `snow` → nieve.jpeg  
  - ⛈️ `thunderstorm` → tormenta.jpeg  
  - Por defecto → `default.jpg`  

## 🛠️ Tecnologías Utilizadas  
- **JavaScript (ES6+)**  
- **API de OpenWeather**  
- **TailwindCSS (para estilos)**  
- **LocalStorage (para almacenamiento en caché)**  

## 🎯 ¿Cómo Funciona?  
1️⃣ Ingresar un **nombre de ciudad** en el formulario.  
2️⃣ La app **valida** la entrada y verifica la caché.  
3️⃣ Si no hay datos en caché, **obtiene nuevos datos** de la API.  
4️⃣ La información del clima se **muestra dinámicamente**.  
5️⃣ El fondo cambia según la **condición climática actual**.  

---

Este resumen en **Markdown** organiza tu código de forma clara y fácil de entender. 🚀 ¡Avísame si necesitas ajustes! 😊
