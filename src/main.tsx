import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './LoginClientes.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasDuvidas from './MinhasDuvidas.tsx'
import { RegistrarClientes } from './RegistrarClientes.tsx'

// ----------------- Rotas de Admin
import AdminLayout from './admin/LayoutAdmin.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashBoard.tsx';    
import AdminCursos from './admin/AdminCursos.tsx';     

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
      { path: 'registro', element: <RegistrarClientes /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)