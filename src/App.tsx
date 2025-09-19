import { CardCursos } from "./components/CardCursos";
import { InputPesquisa } from "./components/InputPesquisa";
import type { CursoType } from "./utils/CursoType";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [cursos, setCursos] = useState<CursoType[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/cursos`)
      const dados = await response.json()
      setCursos(dados)
    }
    buscaDados()

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/clientes/${id}`)
      const dados = await response.json()
      logaCliente(dados)
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey")
      buscaCliente(idCliente as string)
    }
  }, [])

  const listacursos = cursos.map( curso => (
    <CardCursos data={curso} key={curso.id} />
  ))

  return (
    <div className="min-h-[93.3vh] bg-[#10100F]">
      <InputPesquisa setCursos={setCursos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-bold leading-none my-8 font-inter tracking-tight text-[#f1eef1] md:text-5xl lg:text-6xl" >
          Cursos em destaque
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-5">
          {listacursos}
        </div>
      </div>
    </div>
  );
}
