import { useEffect, useState } from "react"

import type { ClienteType } from "../utils/ClienteType"
import ItemCliente from "./components/ItemClientes"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminClientes() {
  const [clientes, setClientes] = useState<ClienteType[]>([])

  useEffect(() => {
    async function getClientes() {
      const response = await fetch(`${apiUrl}/clientes`)
      const dados = await response.json()
      setClientes(dados)
    }
    getClientes()
  }, [])

  const listaClientes = clientes.map(cliente => (
    <ItemCliente key={cliente.id} cliente={cliente} clientes={clientes} setClientes={setClientes} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Clientes
        </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                Cidade
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaClientes}
          </tbody>
        </table>
      </div>
    </div>
  )
}