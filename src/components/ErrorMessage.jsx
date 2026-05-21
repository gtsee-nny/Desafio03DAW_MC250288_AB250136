import PropTypes from 'prop-types'
import './ErrorMessage.css'


function ErrorMessage({ mensaje, onReintentar = null }) {
  // Criterio 7: mensaje de error claro y opción de reintentar
  // mensaje = texto que explica qué salió mal
  // onReintentar = función opcional que se ejecuta al hacer clic en el botón
  // = null significa que ese botón no se mostrará si no se pasa la función

  return (
    <div className="error-container">
      <p className="error-texto">⚠️ {mensaje}</p>
      {onReintentar && (
        // Si existe la función onReintentar, muestra el botón de reintentar
        <button className="error-boton" onClick={onReintentar}>
          🔄 Reintentar
          {/* Botón que llama a la función para intentar de nuevo */}
        </button>
      )}
    </div>
  )
}

ErrorMessage.propTypes = {
  mensaje: PropTypes.string.isRequired,
  // mensaje debe ser un texto y es obligatorio

  onReintentar: PropTypes.func,
  // onReintentar puede ser una función, pero no es obligatorio
}

export default ErrorMessage
// Exporta el componente para poder usarlo en otros archivos
