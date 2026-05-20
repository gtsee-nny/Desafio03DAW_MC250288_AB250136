import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getWeather } from '../services/weatherApi'
import './CountryCard.css'

function CountryCard({ pais, onSelect }) {
  const [temperatura, setTemperatura] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const obtenerTemperatura = async () => {
      try {
        const nombreCapital = pais.capital?.[0]
        if (nombreCapital) {
          const datos = await getWeather(nombreCapital)
          setTemperatura(Math.round(datos.main.temp))
        }
      } catch (err) {
        setError(true)
      }
    }

    obtenerTemperatura()
  }, [pais])

  return (
    <div className="country-card" onClick={() => onSelect(pais)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(pais)}>
      <img
        src={pais.flags?.png}
        alt={`Bandera de ${pais.translations?.spa?.common ?? pais.name?.common ?? 'país desconocido'}`}
        className="country-flag"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = pais.flags?.svg;
        }}
      />
      <div className="country-info">
        <p className="country-name">{pais.translations?.spa?.common ?? pais.name?.common ?? 'Sin nombre'}</p>
        {!error && temperatura !== null && (
          <span className={`country-temp temp-${temperatura < 5 ? 'cold' : temperatura < 20 ? 'cool' : 'warm'}`}>
            {temperatura}°C ⚡
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

export default CountryCard
