import PropTypes from 'prop-types'
import './ErrorMessage.css'

function ErrorMessage({ mensaje, onReintentar = null }) {
  return (
    <div className="error-container">
      <p className="error-texto">⚠️ {mensaje}</p>
      {onReintentar && (
        <button className="error-boton" onClick={onReintentar}>
          🔄 Reintentar
        </button>
      )}
    </div>
  )
}

ErrorMessage.propTypes = {
  mensaje: PropTypes.string.isRequired,
  onReintentar: PropTypes.func,
}

export default ErrorMessage
