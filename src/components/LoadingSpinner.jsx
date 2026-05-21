import PropTypes from 'prop-types'
// PropTypes permite verificar el tipo de datos que recibe este componente
import './LoadingSpinner.css'


function LoadingSpinner({ mensaje = 'Cargando...' }) {
  // LoadingSpinner = componente que muestra una animación de espera

  return (
    <div className="spinner-container">
      {/* Contenedor del spinner y del texto */}
      <div className="spinner" role="status" aria-label="Cargando"></div>
      <p className="spinner-texto">{mensaje}</p>
      {/* Muestra el mensaje debajo del spinner */}
    </div>
  )
}

LoadingSpinner.propTypes = {
  mensaje: PropTypes.string,
  // mensaje debe ser un texto si se pasa como propiedad
}

export default LoadingSpinner
// Exporta este componente para que pueda usarse en otros archivos
