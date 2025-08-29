import { CardCursos } from "./components/CardCursos";
import { InputPesquisa } from "./components/InputPesquisa";
import type { CursoType } from "./utils/CursoType";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [cursos, setCursos] = useState<CursoType[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/cursos`)
      const dados = await response.json()
//      console.log(dados)
      setCursos(dados)
    }
    buscaDados()
  }, [])

  const listacursos = cursos.map( curso => (
    <CardCursos data={curso} key={curso.id} />
  ))

  return (
    <>
      <InputPesquisa setCursos={setCursos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          Cursos <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-800">em destaque</span>
        </h1>
        <div className="flex gap-3">
          {listacursos}
        </div>
      </div>
    </>
  );
}
