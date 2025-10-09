import { useEffect, useState } from "react"

import ItemAdmin from "./components/ItemAdmin"
import { Link } from "react-router-dom"
import type { AdminType } from "../utils/AdminType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminCadAdmin() {
  const [admins, setAdmins] = useState<AdminType[]>([])

  useEffect(() => {
    async function getAdmins() {
      const response = await fetch(`${apiUrl}/admins`)
      const dados = await response.json()
      setAdmins(dados)
    }
    getAdmins()
  }, [])

  const listaAdmins = admins.map(admin => (
    <ItemAdmin key={admin.id} adminLinha={admin} admins={admins} setAdmins={setAdmins} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="text-3xl mb-4 font-semibold font-inter text-[#fff]">
          Cadastro de Administradores do Sistema
        </h1>
        <Link to="/admin/cadAdmin/novo" 
          className="text-white font-inter focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">
          Novo Admin
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-[#e5e5e5]">
          <thead className="text-xs font-inter text-[#e5e5e5] uppercase bg-[#1a1a1a]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Admin
              </th>
              <th scope="col" className="px-6 py-3">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3">
                Nível
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaAdmins}
          </tbody>
        </table>
      </div>
    </div>
  )
}