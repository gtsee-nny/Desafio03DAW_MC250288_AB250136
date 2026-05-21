const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// getWeather = función que pide el clima de una ciudad específica
export async function getWeather(city) {
  try {
    // fetch = función que hace una petición a internet
    // await = espera a que la petición termine antes de continuar
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      // URL de la API:
    )

    // response.ok = true si la respuesta fue correcta (código 200-299)
    if (!response.ok) throw new Error('Respuesta no válida del servidor')

    // response.json() convierte la respuesta JSON en un objeto de JavaScript
    const data = await response.json()
    return data
  } catch (error) {
    // Si algo falla (por ejemplo, sin internet), lanzamos un error claro
    throw new Error('No se pudo conectar con OpenWeatherMap')
  }
}


