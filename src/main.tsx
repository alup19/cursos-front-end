import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './LoginClientes.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasDuvidas from './MinhasDuvidas.tsx'
import { RegistroClientes } from './RegistroClientes.tsx'

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:cursoId', element: <Detalhes /> },
      { path: 'minhasDuvidas', element: <MinhasDuvidas /> },
      { path: 'registro', element: <RegistroClientes /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)