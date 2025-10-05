import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasDuvidas from './MinhasDuvidas.tsx'
import CadClientes from './CadClientes.tsx'

// ----------------- Rotas de Admin
import AdminLayout from './admin/LayoutAdmin.tsx';
import AdminLogin from './admin/AdminLogin.tsx';     
import AdminDashboard from './admin/AdminDashBoard.tsx';
import AdminCursos from './admin/AdminCursos.tsx';
import AdminNovoCurso from './admin/AdminNovoCurso.tsx'
import AdminDuvidas from './admin/AdminDuvidas.tsx'
import AdminCadAdmin from './admin/AdminCadAdmin.tsx'
import AdminNovoAdmin from './admin/AdminNovoAdmin.tsx'
import AdminProfessores from './admin/AdminProfessores.tsx'
import AdminNovoProfessor from './admin/AdminNovoProfessor.tsx'

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminNovoTipoCurso from './admin/AdminNovoTipoCurso.tsx'
import AdminClientes from './admin/AdminClientes.tsx'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },     // rota /admin
      { path: "cursos", element: <AdminCursos /> },     // rota /admin/cursos
      { path: "cursos/novo", element: <AdminNovoCurso /> },
      { path: "duvidas", element: <AdminDuvidas /> },
      { path: "cadAdmin", element: <AdminCadAdmin /> },
      { path: "cadAdmin/novo", element: <AdminNovoAdmin /> },
      { path: "professores", element: <AdminProfessores /> },
      { path: "professores/novo", element: <AdminNovoProfessor /> },
      { path: "cursos/novoTipo", element: <AdminNovoTipoCurso /> },
      { path: "clientes", element: <AdminClientes /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:cursoId', element: <Detalhes /> },
      { path: 'minhasDuvidas', element: <MinhasDuvidas /> },
      { path: 'cadCliente', element: <CadClientes /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)