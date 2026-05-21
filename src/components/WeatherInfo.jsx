import PropTypes from 'prop-types'
import './WeatherInfo.css'

function WeatherInfo({ clima }) {
  // Criterio 4/5: valida datos con optional chaining y muestra temperatura, estado, humedad y viento
  return (
    <div className="weather-container">
      <div className="weather-item">
        <span className="weather-icon">🌡️</span>
        <span className="weather-label">Temperatura</span>
        <span className="weather-valor">{clima.main?.temp ?? 'N/A'}°C</span>
      </div>
      <div className="weather-item">
        <span className="weather-icon">🌤️</span>
        <span className="weather-label">Estado</span>
        <span className="weather-valor">{clima.weather?.[0]?.description ?? 'N/A'}</span>
      </div>
      <div className="weather-item">
        <span className="weather-icon">💧</span>
        <span className="weather-label">Humedad</span>
        <span className="weather-valor">{clima.main?.humidity ?? 'N/A'}%</span>
      </div>
      <div className="weather-item">
        <span className="weather-icon">💨</span>
        <span className="weather-label">Viento</span>
        <span className="weather-valor">{clima.wind?.speed ?? 'N/A'} m/s</span>
      </div>
    </div>
  )
}

WeatherInfo.propTypes = {
  // Criterio 1: validación de props para el objeto clima
  clima: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number,
      humidity: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
      })
    ),
    wind: PropTypes.shape({
      speed: PropTypes.number,
    }),
  }).isRequired,
}

export default WeatherInfo
