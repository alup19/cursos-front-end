import type { CursoType } from "./utils/CursoType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()

  const [curso, setCurso] = useState<CursoType>()
  const { cliente, logaCliente } = useClienteStore()

  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/cursos/${params.cursoId}`)
      const dados = await response.json()
      setCurso(dados)
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

  async function enviaDuvida(data: Inputs) {

    const response = await fetch(`${apiUrl}/duvidas`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        cursoId: Number(params.cursoId),
        descricao: data.descricao
      })
    })

    if (response.status == 201) {
      toast.success("Obrigado. Sua duvida foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua duvida")
    }
  }

  return (
    <div className="bg-[#10100F] pt-8 h-[93.3vh]">
      <section className="flex mx-auto flex-col w-[40rem] items-start border p-5 border-gray-200 rounded-lg shadow md:max-w-5xl dark:border-gray-700 dark:bg-[#050504]">
        <img className="object-cover rounded-t-lg rounded-[1rem]"
          src={curso?.foto} alt="Foto do Curso" />
        <div className="flex flex-col justify-between py-4 leading-normal">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {curso?.titulo} - {curso?.tipoCurso.nome}
          </h5>
          <div>
            <h5 className="text-[1.1rem] tracking-tight dark:text-[#ccc]">
              Duração: {curso?.cargaHoraria} horas
            </h5>
            <h5 className="text-[1.1rem] tracking-tight dark:text-[#ccc]">
              Preço: R$ {Number(curso?.preco)
                .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </h5>
            <h5 className="text-[1.1rem] tracking-tight dark:text-[#ccc]">
              Professor: <span className="text-[1.1rem] tracking-tight dark:text-[#ccc] font-bold">{curso?.professor.nome}</span>
            </h5>
          </div>
          <p className="my-3 font-normal text-gray-700 dark:text-gray-400">
            {curso?.descricao}
          </p>
          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                🙂Você pode tirar duvidas abaixo ou comprar o Curso!</h3>
              <form>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua duvida"
                  required
                  {...register("descricao")}>
                </textarea>
                <div className="flex flex-row gap-4">
                  <button type="button" className="cursor-pointer text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-[#247c3a] to-[#42e242]">Comprar Curso</button>
                  <button type="submit" onClick={handleSubmit(enviaDuvida)} className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Duvida</button>
                </div>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Se interressou pelo Curso? Faça login e tire sua duvida sobre valores!
            </h2>
          }
        </div>
      </section>
    </div>
  )
}