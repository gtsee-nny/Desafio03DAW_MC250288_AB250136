import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getWeather } from '../services/weatherApi'
import WeatherInfo from './WeatherInfo'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import './CountryDetail.css'

function CountryDetail({ pais, onVolver }) {
  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const capital = pais.capital?.[0]

  const cargarClima = () => {
    if (!capital) {
      setError('Este país no tiene capital registrada')
      setCargando(false)
      return
    }

    setCargando(true)
    setError(null)
    setClima(null)

    getWeather(capital)
      .then(data => {
        if (data.cod !== 200) {
          setError('No se pudo obtener el clima de esta capital')
        } else {
          setClima(data)
        }
      })
      .catch(() => setError('Error al conectar con la API del clima'))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarClima()
  }, [pais])

  return (
    <div className="detail-container">
      <button className="detail-volver" onClick={onVolver}>← Volver a la lista</button>

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
          <h2 className="detail-nombre">{pais.name?.common ?? 'Sin nombre'}</h2>
          <br />
          <p className="detail-capital">
            🏙️ Capital: <strong>{capital ?? 'No disponible'}</strong>
          </p>
        </div>
      </div>

      <div className="detail-clima">
        <br />
        <h3>Clima actual en {capital ?? 'la capital'}</h3>
        <br />
        {cargando && <LoadingSpinner mensaje="Obteniendo clima..." />}
        {error && <ErrorMessage mensaje={error} onReintentar={cargarClima} />}
        {clima && <WeatherInfo clima={clima} />}
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

export default CountryDetail
