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
        <h1 className="text-3xl mb-4 font-semibold font-inter text-[#fff]">
          Controle de Clientes
        </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-[#e5e5e5]">
          <thead className="text-xs font-inter text-[#e5e5e5] uppercase bg-[#1a1a1a]">
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