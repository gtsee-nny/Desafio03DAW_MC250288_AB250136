// BASE_URL = dirección base de la API de Rest Countries
// Esta API nos entrega información de países como nombre, bandera y capital
const BASE_URL = 'https://restcountries.com/v3.1'

// getCountries = función que descarga todos los países desde la API
export async function getCountries() {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,flags,capital,translations`
      // URL de la API para obtener todos los países, pero solo con los campos que necesitamos
    )

    // response.ok = true si la respuesta fue correcta (código 200-299)
    if (!response.ok) throw new Error('Respuesta no válida del servidor')

    // response.json() convierte el texto JSON en un objeto de JavaScript
    const data = await response.json()
    return data
  } catch (error) {
    // Si falla la petición, lanzamos un error para que el componente lo maneje
    throw new Error('No se pudo conectar con Rest Countries')
  }
}
