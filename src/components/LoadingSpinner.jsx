import PropTypes from 'prop-types'
import './LoadingSpinner.css'

function LoadingSpinner({ mensaje = 'Cargando...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner" role="status" aria-label="Cargando"></div>
      <p className="spinner-texto">{mensaje}</p>
    </div>
  )
}

LoadingSpinner.propTypes = {
  mensaje: PropTypes.string,
}

export default LoadingSpinner
