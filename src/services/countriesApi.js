const BASE_URL = 'https://restcountries.com/v3.1'

export async function getCountries() {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,flags,capital,translations`)
    if (!response.ok) throw new Error('Respuesta no válida del servidor')
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('No se pudo conectar con Rest Countries')
  }
}
