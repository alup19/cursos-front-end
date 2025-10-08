import { useEffect, useState } from "react"

import ItemCurso from './components/ItemCurso'
import type { CursoType } from "../utils/CursoType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminCursos() {
  const [cursos, setCursos] = useState<CursoType[]>([])

  useEffect(() => {
    async function getCursos() {
      const response = await fetch(`${apiUrl}/cursos`)
      const dados = await response.json()
      setCursos(dados)
    }
    getCursos()
  }, [])

  const listaCursos = cursos.map(curso => (
    <ItemCurso key={curso.id} curso={curso} cursos={cursos} setCursos={setCursos} />
  ))

  return (
    <div className='m-4 mt-24 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl mb-4 font-semibold font-inter text-[#fff]">
          Cadastro de Cursos
        </h1>
        <div className="flex gap-2">
          <Link to="/admin/cursos/novoTipo"
            className="text-white font-interfocus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none ">
            Novo Tipo de Curso
          </Link>
          <Link to="/admin/cursos/novo"
            className="text-white font-inter focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Novo Curso
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-[#e5e5e5]">
          <thead className="text-xs font-inter text-[#e5e5e5] uppercase bg-[#1a1a1a]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Curso
              </th>
              <th scope="col" className="px-6 py-3">
                Professor
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo do Curso
              </th>
              <th scope="col" className="px-6 py-3">
                Duração
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="font-inter text-[#fff]">
            {listaCursos}
          </tbody>
        </table>
      </div>
    </div>
  )
}