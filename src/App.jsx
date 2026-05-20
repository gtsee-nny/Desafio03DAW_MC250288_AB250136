import { useState, useEffect } from 'react'
import { getCountries } from './services/countriesApi'
import CountryCard from './components/CountryCard'
import CountryDetail from './components/CountryDetail'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  const [paises, setPaises] = useState([])
  const [paisSeleccionado, setPaisSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  const cargarPaises = () => {
    setCargando(true)
    setError(null)

    getCountries()
      .then(data => {
        const ordenados = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
        setPaises(ordenados)
      })
      .catch(() => setError('Error al cargar los países. Verifica tu conexión.'))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarPaises()
  }, [])

  const paisesFiltrados = paises.filter(pais =>
    pais.name?.common?.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (paisSeleccionado) {
    return (
      <CountryDetail
        pais={paisSeleccionado}
        onVolver={() => setPaisSeleccionado(null)}
      />
    )
  }

  return (
    <div className="app-container">
      <h1 className="app-titulo">Terral Horizons 🌎</h1>

      <div className="app-busqueda">
        <input type="text" placeholder="Buscar país..." value={busqueda} onChange={(e)=> setBusqueda(e.target.value)}
        className="app-input"
        />
        {busqueda && (
        <button className="app-limpiar" onClick={()=> setBusqueda('')}>✕</button>
        )}
      </div>

      {cargando &&
      <LoadingSpinner mensaje="Cargando países..." />}
      {error &&
      <ErrorMessage mensaje={error} onReintentar={cargarPaises} />}

      {!cargando && !error && (
      <>
        <p className="app-contador">
          {paisesFiltrados.length} {paisesFiltrados.length === 1 ? 'país encontrado' : 'países encontrados'}
        </p>
        <div className="app-lista">
          {paisesFiltrados.length > 0
          ? paisesFiltrados.map(pais => (
          <CountryCard key={pais.name.common} pais={pais} onSelect={setPaisSeleccionado} />
          ))
          : <p className="app-sin-resultados">No se encontraron países con ese nombre.</p>
          }
        </div>
      </>
      )}
    </div>
  )
}

export default App
