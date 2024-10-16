import { useState } from 'react';
import './App.css';
import Login from './components/auth/Login.jsx';

import EstudianteDashboard from './components/userDashboards/estudianteDashboard.jsx';
import AdminDashboard from './components/userDashboards/adminDashboard';
import ProfesorDashboard from './components/userDashboards/profesoresDashboard.jsx';

import FormEstudiante from './components/funciones/admin/formEstudiante.jsx';
import Estudiantes from './components/funciones/admin/estudiantes.jsx';
import Materias from './components/funciones/admin/materias.jsx';
import Peticiones from './components/funciones/admin/peticiones.jsx';
import FormProfesores from './components/funciones/admin/formProfesores.jsx';
import Profesores from './components/funciones/admin/profesores.jsx';

import MateriasAlumno from './components/funciones/estudiante/materiasAlumno.jsx';
import PlanEstudio from './components/funciones/estudiante/planEstudio.jsx';
import Solicitar from './components/funciones/estudiante/solicitar.jsx';
import FormMateria from './components/funciones/profesor/formMateria.jsx';

import ViewError from './components/Error/error.jsx';

import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />            
            <Route path='/admin' element={ <AdminDashboard />}>
              <Route path='formulario_estudiante' element={<FormEstudiante />} />
              <Route path='formulario_profesores' element={<FormProfesores />} />
              <Route path='profesores' element={<Profesores />}></Route>
              <Route path='formulario_estudiante/:id' element={<FormEstudiante />} />
              <Route path='formulario_profesores/:id' element={<FormProfesores />} />
              <Route path='estudiantes' element={<Estudiantes />}/>
              <Route path='materias' element={<Materias />} />
              <Route path='peticiones' element={<Peticiones />} />
            </Route>
            <Route path='/estudiante' element={<EstudianteDashboard />}>
              <Route path='materias' element={<MateriasAlumno />} />
              <Route path='plan_de_estudio' element={<PlanEstudio />} />
              <Route path='solicitar' element={<Solicitar />} />
            </Route>
            <Route path='/profesor' element={<ProfesorDashboard />}>
              <Route path='nuevaMateria' element={<FormMateria />} />
            </Route>
            <Route path='Error' element={<ViewError />}/>
            <Route path='*' element={<ViewError />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App
