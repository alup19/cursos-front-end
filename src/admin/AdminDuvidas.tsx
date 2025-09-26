import { useEffect, useState } from "react"

import type { DuvidaType } from "../utils/DuvidaType"
import ItemDuvida from "./components/ItemDuvida"

const apiUrl = import.meta.env.VITE_API_URL

function ControleDuvidas() {
  const [duvidas, setDuvidas] = useState<DuvidaType[]>([])

  useEffect(() => {
    async function getDuvidas() {
      const response = await fetch(`${apiUrl}/duvidas`)
      const dados = await response.json()
      setDuvidas(dados)
    }
    getDuvidas()
  }, [])

  const listaPropostas = duvidas.map(duvida => (
    <ItemDuvida key={duvida.id} duvida={duvida} duvidas={duvidas} setDuvidas={setDuvidas} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Duvidas
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Curso
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Curso
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Duvida do Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Resposta do Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPropostas}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControleDuvidas