import './App.css'
import { PaginaInicial } from './pages/PaginaInicial.jsx'
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
import CreateMatricula from './pages/CreateMatricula.jsx';
import DetailMatricula from './pages/DetailMatricula.jsx';
import EditMatricula from './pages/EditMatricula.jsx';
import ListMatriculas from './pages/ListMatriculas.jsx';
import Dashboard from './layout/Dashboard.jsx';

function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<PaginaInicial/>}/>
            <Route path='/' element={<Auth/>}>
            <Route path='ingresar' element={<Ingresar/>}/>
            <Route path='registrar' element={<Registrar/>}/>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='dashboard/materias' element={<Materias />} />
            <Route path='materias-registradas' element={<MateriasRegistradas />} />
            <Route path='editar-materia/:id' element={<EditarMateria />} />
            <Route path="dashboard/estudiantes" element={<CreateEstudiante />} />
            <Route path="estudiante/editar/:id" element={<EditEstudiante />} />
            <Route path="estudiantes/detalle/:id" element={<DetailEstudiante />} />
            <Route path="/estudiantes" element={<ListEstudiantes />} /> 
            <Route path="dashboard/matriculas" element={<CreateMatricula />} />
            <Route path="matricula/editar/:id" element={<EditMatricula />} />
            <Route path="matricula/detalle/:id" element={<DetailMatricula />} />
            <Route path="matriculas" element={<ListMatriculas />} /> 
        </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
