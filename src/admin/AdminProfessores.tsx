import { useEffect, useState } from "react"

import ItemProfessor from "./components/ItemProfessor"
import type { ProfessorType } from "../utils/ProfessorType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminProfessores() {
  const [professores, setProfessores] = useState<ProfessorType[]>([])

  useEffect(() => {
    async function getProfessores() {
      const response = await fetch(`${apiUrl}/professores`)
      const dados = await response.json()
      setProfessores(dados)
    }
    getProfessores()
  }, [])

  const listaProfessores = professores.map(professor => (
    <ItemProfessor key={professor.id} professor={professor} professores={professores} setProfessores={setProfessores} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="text-3xl mb-4 font-semibold font-inter text-[#fff]">
          Cadastro de Professores
        </h1>
        <Link to="/admin/professores/novo" 
          className="text-white font-interfocus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none ">
          Novo Professor
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs font-inter text-[#e5e5e5] uppercase bg-[#1a1a1a]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Professor
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaProfessores}
          </tbody>
        </table>
      </div>
    </div>
  )
}