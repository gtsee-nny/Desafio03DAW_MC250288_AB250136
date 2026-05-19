import PropTypes from 'prop-types'
import './CountryCard.css'

function CountryCard({ pais, onSelect }) {
  return (
    <div className="country-card" onClick={() => onSelect(pais)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(pais)}>
      <img
        src={pais.flags?.png}
        alt={`Bandera de ${pais.name?.common ?? 'país desconocido'}`}
        className="country-flag"
      />
      <p className="country-name">{pais.name?.common ?? 'Sin nombre'}</p>
    </div>
  )
}

CountryCard.propTypes = {
  pais: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
    }),
    flags: PropTypes.shape({
      png: PropTypes.string,
    }),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default CountryCard
