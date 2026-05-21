
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// PropTypes = herramienta para verificar qué tipo de información recibe este componente
import { getWeather } from '../services/weatherApi'
import WeatherInfo from './WeatherInfo'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import './CountryDetail.css'


function CountryDetail({ pais, onVolver }) {
  // ESTADOS LOCALES
  const [clima, setClima] = useState(null)
  // clima = guarda los datos del clima que vienen de la API
  // setClima = función para guardar esos datos
  // null = no hay datos al principio

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const capital = pais.capital?.[0]
  // capital = toma la primera capital del país
  // pais.capital puede ser una lista, por eso usamos [0]
  // ?. = operador que evita error si pais.capital no existe

  const cargarClima = () => {
    // Esta función pide el clima para la capital y actualiza los estados según el resultado
    if (!capital) {
      // Si el país no tiene capital, no se puede pedir clima
      setError('Este país no tiene capital registrada')
      setCargando(false)
      return
      // return = salir de la función aquí mismo
    }

    setCargando(true)
    // Decimos que estamos cargando el clima

    setError(null)
    // Limpia cualquier error previo

    setClima(null)
    // Borra datos de clima anteriores antes de pedir los nuevos

    getWeather(capital)
      .then(data => {
        // Cuando la API responde, entra aquí con los datos
        if (data.cod !== 200) {
          // data.cod es un código de respuesta de la API
          // 200 significa éxito, cualquier otro número indica falla
          setError('No se pudo obtener el clima de esta capital')
        } else {
          setClima(data)
          // Si todo salió bien, guardamos el clima
        }
      })
      .catch(() => setError('Error al conectar con la API del clima'))
      // Si la conexión falla, guardamos un mensaje de error

      .finally(() => setCargando(false))
      // Siempre que termine la petición, dejamos de mostrar el spinner
  }

  useEffect(() => {
    // useEffect con [pais] significa: ejecutar cuando el país cambie
    cargarClima()
    // Llama a cargarClima la primera vez y también si el usuario elige otro país
  }, [pais])

  return (
    <div className="detail-container">
      <button className="detail-volver" onClick={onVolver}>
        ← Volver a la lista
      </button>

      <div className="detail-header">
        <img
          src={pais.flags?.png}
          alt={`Bandera de ${pais.name?.common ?? 'país'}`}
          className="detail-bandera"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = pais.flags?.svg;
          }}
        />
        <div>
          <br />
          <h2 className="detail-nombre">
            {pais.name?.common ?? 'Sin nombre'}
          </h2>
          {/* Muestra el nombre común del país, o 'Sin nombre' si no está disponible */}
          <br />
          <p className="detail-capital">
            🏙️ Capital: <strong>{capital ?? 'No disponible'}</strong>
          </p>
          {/* Muestra la capital si existe, o un texto alternativo si no */}
        </div>
      </div>

      <div className="detail-clima">
        {/* Sección que muestra información del clima */}
        <br />
        <h3>Clima actual en {capital ?? 'la capital'}</h3>
        <br />
        {cargando && <LoadingSpinner mensaje="Obteniendo clima..." />}
        {/* Si cargando es verdadero, muestra el spinner */}

        {error && <ErrorMessage mensaje={error} onReintentar={cargarClima} />}
        {/* Si hay error, muestra el mensaje y permite reintentar */}

        {clima && <WeatherInfo clima={clima} />}
        {/* Si hay datos de clima, muestra el componente WeatherInfo */}
      </div>
    </div>
  )
}

CountryDetail.propTypes = {
  pais: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
    }),
    flags: PropTypes.shape({
      png: PropTypes.string,
      svg: PropTypes.string,
    }),
    capital: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onVolver: PropTypes.func.isRequired,
}
// PropTypes = reglas que dicen qué tipos de datos espera este componente
// .isRequired = estos datos son obligatorios, la app necesita que existan

export default CountryDetail
// Exporta este componente para que pueda usarse en otros archivos