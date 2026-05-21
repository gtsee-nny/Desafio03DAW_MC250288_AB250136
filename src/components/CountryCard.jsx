import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// PropTypes ayuda a verificar qué tipo de información recibe el componente
import { getWeather } from '../services/weatherApi'
import './CountryCard.css'

function CountryCard({ pais, onSelect }) {
  // ESTADOS LOCALES 
  const [temperatura, setTemperatura] = useState(null)
  // temperatura = guarda el valor numérico de la temperatura en grados Celsius
  // setTemperatura = función para actualizar esa temperatura
  // null = no tenemos temperatura al inicio

  const [error, setError] = useState(false)
  // error = indica si falló la petición de clima
  // false = no hay error al principio

  useEffect(() => {
    // useEffect se ejecuta cuando el componente se monta o cuando cambia el país
    const obtenerTemperatura = async () => {
      try {
        const nombreCapital = pais.capital?.[0]
        // pais.capital = lista de nombres de capitales
        // [0] = primera capital de la lista
        // ?. = si capital no existe, no causa error

        if (nombreCapital) {
          const datos = await getWeather(nombreCapital)
          // espera la respuesta de la API de clima

          setTemperatura(Math.round(datos.main.temp))
          // datos.main.temp = temperatura actual en grados Celsius
        }
      } catch (err) {
        setError(true)
        // Si algo falla, guardamos que hubo error para no mostrar la temperatura
      }
    }

    obtenerTemperatura()
    // Llamamos a la función para obtener el clima de la capital
  }, [pais])
  // [pais] = vuelve a ejecutar el efecto si cambia el país que muestra esta tarjeta

  return (
    <div
      className="country-card"
      onClick={() => onSelect(pais)}
      // onClick = cuando el usuario hace clic en la tarjeta
      // onSelect(pais) = avisa al componente padre qué país seleccionó
      role="button"
      tabIndex={0}
      // role y tabIndex sirven para que la tarjeta sea accesible con teclado
      onKeyDown={(e) => e.key === 'Enter' && onSelect(pais)}
      // onKeyDown = si el usuario presiona Enter, también selecciona el país
    >
      <img
        src={pais.flags?.png}
        // src = imagen de la bandera en formato PNG
        alt={`Bandera de ${pais.translations?.spa?.common ?? pais.name?.common ?? 'país desconocido'}`}
        // alt = texto alternativo por si la imagen no se puede mostrar
        className="country-flag"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = pais.flags?.svg
          // Si la imagen PNG falla, intenta cargar la versión SVG
        }}
      />

      <div className="country-info">
        <p className="country-name">
          {pais.translations?.spa?.common ?? pais.name?.common ?? 'Sin nombre'}
          {/* Muestra el nombre del país en español si existe, sino el nombre común */}
        </p>

        {!error && temperatura !== null && (
          // Si no hay error y ya tenemos temperatura, mostramos el recuadro
          <span
            className={`country-temp temp-${temperatura < 5 ? 'cold' : temperatura < 20 ? 'cool' : 'warm'}`}
          >
            {temperatura}°C ⚡
            {/* Muestra la temperatura redondeada y un icono */}
          </span>
        )}
      </div>
    </div>
  )
}

CountryCard.propTypes = {
  pais: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
    }),
    capital: PropTypes.arrayOf(PropTypes.string),
    flags: PropTypes.shape({
      png: PropTypes.string,
      svg: PropTypes.string,
    }),
    translations: PropTypes.object,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
}
// propTypes = reglas que indican qué propiedades debe recibir este componente
// .isRequired = estas propiedades son obligatorias

export default CountryCard
// export default = permite que otro archivo importe este componente sin llaves
