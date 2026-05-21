
import { useState, useEffect } from 'react'
// useState = herramienta que permite que la app recuerde información (como el país seleccionado)
// useEffect = herramienta que ejecuta código cuando el componente aparece por primera vez

import { getCountries } from './services/countriesApi'
// Trae la función getCountries que SE CONECTA A INTERNET y obtiene la lista de todos los países del mundo

import CountryCard from './components/CountryCard'

import CountryDetail from './components/CountryDetail'

import LoadingSpinner from './components/LoadingSpinner'

import ErrorMessage from './components/ErrorMessage'

import './App.css'

function App() {
  // LOS ESTADOS (MEMORIA DE LA APP) 
  // "Estado" = información que la app recuerda. Cada estado tiene:
  //   - Un nombre (ej: 'paises')
  //   - Una función para cambiarla (ej: 'setPaises')
  //   - Un valor inicial (ej: [])

  const [paises, setPaises] = useState([])
  // paises = lista de TODOS los países que traemos de internet
  // setPaises = función para actualizar esta lista cuando lleguen los datos
  // [] = empieza vacía porque aún no traemos los datos

  const [paisSeleccionado, setPaisSeleccionado] = useState(null)
  // paisSeleccionado = el país que el usuario clickeó para ver detalles (o null si no seleccionó ninguno)
  // setPaisSeleccionado = función para cambiar cuál país está seleccionado
  // null = empieza sin nada seleccionado

  const [cargando, setCargando] = useState(true)
  // cargando = TRUE cuando la app está esperando datos de internet, FALSE cuando ya llegaron
  // setCargando = función para cambiar si está cargando o no
  // true = empieza en true porque nada más abrir la app, DEBE descargar los países

  const [error, setError] = useState(null)
  // error = guarda un mensaje de error si algo sale mal (ejemplo: "Sin conexión a internet")
  // setError = función para poner un error o borrarlo
  // null = empieza sin error porque todo está bien

  const [busqueda, setBusqueda] = useState('')
  // busqueda = el texto que escribe el usuario en la caja de "Buscar país..."
  // setBusqueda = función para actualizar qué escribió el usuario
  // '' = empieza vacía (sin nada escrito)

  // FUNCIÓN PARA DESCARGAR LOS PAÍSES 
  const cargarPaises = () => {
    // Paso 1: Decir que estamos cargando
    setCargando(true)
    // Cambiamos cargando a TRUE para mostrar el spinner 

    // Paso 2: Limpiar errores previos
    setError(null)
    // Si antes había un error, lo borramos para empezar de nuevo

    // Paso 3: Conectarse a internet y descargar los países
    getCountries() 
      .then(data => {
        // .then = "cuando los datos lleguen desde internet, ENTONCES haz esto"
        // data = los países que bajamos de internet en formato de lista

        // Paso 3a: Ordenar los países alfabéticamente
        const ordenados = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
          // sort = función que ordena de menor a mayor
          // (a, b) = compara dos países (a y b)
          // localeCompare = función que compara textos en orden alfabético
          // a.name.common = el nombre común del país (ej: "Argentina")
        )
        // Paso 3b: Guardar los países ordenados en el estado
        setPaises(ordenados) // Ahora 'paises' tiene toda la lista ordenada
      })
      .catch(() => setError('Error al cargar los países. Verifica tu conexión.'))
      // .catch = "si hay un ERROR descargando, ENTONCES haz esto"
      // setError = guardamos el mensaje de error para mostrarlo en la pantalla

      .finally(() => setCargando(false))
      // .finally = "cuando termines, ya sea que funcione o falle, ENTONCES haz esto"
      // setCargando(false) = decimos que ya terminó de cargar (guardamos el spinner)
  }

  // EJECUTAR ALGO CUANDO LA APP ABRE (EFECTO)
  useEffect(() => {
    // Este código adentro se ejecuta UNA SOLA VEZ cuando la app aparecer por primera vez
    cargarPaises() // Llama a la función para descargar los países
  }, [])
  // [] = "dependencias" (lista vacía = solo ejecutar cuando la app carga, no en cada cambio)

  //FILTRAR PAÍSES SEGÚN LA BÚSQUEDA
  // "Filtrar" = hacer una lista nueva con solo lo que queremos
  const paisesFiltrados = paises.filter(pais =>
    // .filter = función que crea una lista nueva SIN los elementos que no queremos
    // pais = cada país de la lista, uno por uno
    pais.name?.common?.toLowerCase().includes(busqueda.toLowerCase())
    // pais.name = el objeto que contiene el nombre del país
    // ? = "si existe, continúa; si es null, detente" (para evitar errores)
    // .common = el nombre común (ej: "Argentina", no "Argentine Republic")
    // .toLowerCase() = convierte a minúsculas para que la búsqueda NO sea sensible a mayúsculas
    // .includes(busqueda.toLowerCase()) = pregunta si el nombre contiene lo que escribió el usuario
  )

  //  MOSTRAR DETALLE O LISTA 
  // Si el usuario clickeó un país, mostramos la pantalla de detalles en lugar de la lista
  if (paisSeleccionado) {
    // if = "si" (verifica si es verdadero)
    // paisSeleccionado = tenemos UN país guardado
    return (
      <CountryDetail
        // CountryDetail = componente que muestra: bandera, capital, población, etc. del país
        pais={paisSeleccionado}
        // Pasamos el país seleccionado al componente para que sepa qué mostrar
        onVolver={() => setPaisSeleccionado(null)}
        // onVolver = función que se ejecuta cuando el usuario clickea el botón "Volver"
        // setPaisSeleccionado(null) = limpiamos la selección y volvemos a la lista
      />
    )
  }

  // PANTALLA PRINCIPAL: LISTA DE PAÍSES 
  return (
    <div className="app-container">
      <h1 className="app-titulo">Terral Horizons 🌎</h1>
      <div className="app-busqueda">

        <input
          type="text"
          placeholder="Buscar país..."
          // placeholder = el texto "gris" que aparece cuando el campo está vacío
          value={busqueda}
          // value = el contenido que muestra es lo que está guardado en el estado 'busqueda'
          onChange={(e) => setBusqueda(e.target.value)}
          // onChange = "cuando el usuario escribe, ejecuta esta función"
          // (e) = evento que contiene lo que escribió el usuario
          // e.target.value = lo que escribió el usuario
          // setBusqueda = guardamos lo que escribió en el estado 'busqueda'
          className="app-input"
        />

        {busqueda && (
          // && = "si lo de la izquierda es verdadero, ENTONCES muestra lo de la derecha"
          // {busqueda} = si el campo tiene texto (no está vacío)
          // si está vacío, NO muestra el botón
          <button className="app-limpiar" onClick={() => setBusqueda('')}>
            ✖️
          </button>
        )}
      </div>

      {cargando && <LoadingSpinner mensaje="Cargando países..." />}
      {/* Si cargando es TRUE, muestra el spinner */}
  
      {error && <ErrorMessage mensaje={error} onReintentar={cargarPaises} />}
      {/* Si error tiene texto, muestra el componente ErrorMessage */}
      

      {!cargando && !error && ( // Si ya no está cargando y no hay error, muestra la lista de países
        <>
          <p className="app-contador">
            {paisesFiltrados.length}{' '}
            {paisesFiltrados.length === 1 ? 'país encontrado' : 'países encontrados'}
            {/* Muestra cuántos países coinciden con la búsqueda */}
          </p>
          <div className="app-lista"> {/* Contenedor con las tarjetas de los países */}
            {paisesFiltrados.length > 0 ? (
              paisesFiltrados.map(pais => (
                <CountryCard
                  key={pais.name.common} // La clave única para cada elemento de la lista
                  pais={pais} // Pasa los datos del país al componente CountryCard
                  onSelect={setPaisSeleccionado} // Registra el país seleccionado cuando el usuario hace clic
                />
              ))
            ) : (
              <p className="app-sin-resultados">No se encontraron países con ese nombre.</p> // Mensaje cuando la búsqueda no devuelve resultados
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App // Exporta este componente para que pueda usarse desde otros archivos
