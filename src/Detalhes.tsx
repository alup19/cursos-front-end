import type { CursoType } from "./utils/CursoType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const apiUrl = import.meta.env.VITE_API_URL

export default function Detalhes() {
  const params = useParams()

  const [curso, setCurso] = useState<CursoType>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/cursos/${params.cursoId}`)
      const dados = await response.json()
      // console.log(dados)
      setCurso(dados)
    }
    buscaDados()
  }, [])

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={curso?.foto} alt="Foto do Carro" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {curso?.titulo} - {curso?.tipoCurso.nome}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Duração: {curso?.cargaHoraria} - Professor: {curso?.professor.nome}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Preço R$: {Number(curso?.preco)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {curso?.descricao}
          </p>
        </div>
      </section>
    </>
  )
}