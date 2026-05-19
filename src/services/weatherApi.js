const API_KEY = import.meta.env.VITE_WEATHER_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    )
    if (!response.ok) throw new Error('Respuesta no válida del servidor')
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('No se pudo conectar con OpenWeatherMap')
  }
}
