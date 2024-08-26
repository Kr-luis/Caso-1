import './App.css'
import { PaginaInicial } from './pages/PaginaInicial.jsx'
// import { Productos } from './pages/Productos.jsx'
import Ingresar from './pages/Ingresar.jsx'
import { Registrar } from './pages/Registrar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider.jsx'
import Auth from './layout/Auth'
import { PrivateRoute } from './routes/PrivateRoute.jsx'
import Materias from './pages/Materias.jsx'
import MateriasRegistradas from './pages/MateriasRegistradas.jsx'
import EditarMateria from './pages/EditarMateria.jsx'
import CreateEstudiante from './pages/CreateEstudiante.jsx';
import ListEstudiantes from './pages/ListEstudiantes.jsx';
import EditEstudiante from './pages/EditEstudiante.jsx';
import DetailEstudiante from './pages/DetailEstudiante';
// import Forgot from './pages/Forgot.jsx'
// import { NoEncontrada } from './pages/NoEncontrada.jsx';
// import { Confirmar } from './pages/ConfirmarEmail';
// import { Confirmartienda } from './pages/confirmartienda.jsx';
// import Restablecer from './pages/Restablecer';
// import Listar from './pages/Listar.jsx'
// import Crear from './pages/Crear.jsx'
// import BuscarProducto from './pages/BuscarProducto.jsx'
import Dashboard from './layout/Dashboard.jsx'
// import Listartienda from './pages/Listartienda.jsx'
// import Confirmacion_registro_tienda from './pages/Confirmacion_registro_tienda.jsx'
// import CrearProducto from './pages/CrearProductos.jsx'
// import AdministrarTienda  from './pages/AdministrarTienda.jsx'
// import AdministrarProducto from './pages/AdministrarProducto.jsx'
function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<PaginaInicial/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='ingresar' element={<Ingresar/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            {/* <Route path='usuario/confirmar/:token' element={<Confirmar/>}/> */}
            {/* <Route path='/confirmartienda/:tokentienda' element={<Confirmartienda/>}/> */}
            {/* <Route path='forgot/:id' element={<Forgot/>}/> */}
            {/* <Route path='/usuario/recuperar-password/:token' element={<Restablecer />} /> */}
            <Route path='dashboard' element={<Dashboard />} />
            {/* <Route path='/productos' element={<Productos/>}/> */}
            <Route path='dashboard/materias' element={<Materias />} />
            <Route path='materias-registradas' element={<MateriasRegistradas />} />
            <Route path='editar-materia/:id' element={<EditarMateria />} />
            <Route path="dashboard/estudiantes" element={<CreateEstudiante />} />
            <Route path="estudiante/editar/:id" element={<EditEstudiante />} />
            <Route path="estudiantes/detalle/:id" element={<DetailEstudiante />} />
            <Route path="estudiantes" element={<ListEstudiantes />} /> 
            {/* <Route path='dashboard/crear' element={<Crear/>} /> */}
            {/* <Route path='dashboard/listartienda' element={<Listartienda/>} /> */}
            {/* <Route path='dashboard/buscar' element={<BuscarProducto/>} /> */}
            {/* <Route path='dashboard/crearproducto' element={<CrearProducto/>} /> */}
            {/* <Route path='dashboard/administrartienda' element={<AdministrarTienda/>} /> */}
            {/* <Route path='dashboard/actualizarproducto' element={<AdministrarProducto/>} /> */}

            {/* <Route path='*' element={<NoEncontrada />} /> */}
        </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
