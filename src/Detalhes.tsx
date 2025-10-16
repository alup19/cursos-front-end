import type { CursoType } from "./utils/CursoType"
import { Link, useParams } from "react-router-dom"
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
    <div className="bg-[#10100F] pt-8 min-h-[93.3vh]">
      <section className="flex mx-auto flex-col w-[50rem] items-start border-[#1C1B1D] border-[3px] p-5 rounded-lg shadow md:max-w-5xl">
        <img className="object-cover rounded-t-lg rounded-[1rem]"
          src={curso?.foto} alt="Foto do Curso" />
        <div className="flex flex-col justify-between py-4 leading-normal">
          <div className="flex flex-row justify-between w-[47rem]">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
              {curso?.titulo}
            </h5>
            <h2 className="text-white flex justify-center items-center bg-gradient-to-r from-[#245A7C] to-[#42A4E2] text-center rounded-[0.6875rem] w-[6.8125rem] h-[1.85rem] text-[1rem] font-inter font-normal leading-normal">{curso?.tipoCurso.nome}</h2>
          </div>
          <div className="font-inter">
            <h5 className="text-[1.1rem] tracking-tight text-[#bdbdbd]">
              <span className="font-bold text-white">Duração</span> {curso?.cargaHoraria} horas
            </h5>
            <h5 className="text-[1.1rem] tracking-tight text-[#bdbdbd]">
              <span className="font-bold text-white">Preço: </span>R$ {Number(curso?.preco)
                .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </h5>
            <h5 className="text-[1.1rem] tracking-tight text-[#bdbdbd] ">
              <span className="font-bold text-white">Professor:</span> <span className="text-[1.1rem] tracking-tight">{curso?.professor.nome}</span>
            </h5>
          </div>
          <div className="my-6">
            <h3 className="font-inter text-2xl font-semibold tracking-tight text-white pb-3">Descrição do Curso:</h3>
            <div className="bg-[#1d1b1b] rounded-[0.5rem] py-2 break-words overflow-hidden">
              <p className="font-normal font-inter text-[#b4b4b4] ml-2">
                {curso?.descricao}
                {curso?.descricao}
                {curso?.descricao}
              </p>
            </div>
          </div>
          {cliente.id ?
            <>
              <h3 className="text-xl font-inter font-bold tracking-tight text-white dark:text-white">
                Você pode tirar duvidas abaixo ou comprar nosso Curso!</h3>
              <form>
                <input type="text" className="mb-2 mt-4 bg-[#1d1b1b] font-inter border-2 border-[#2d2b30] text-[#b4b4b4] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 font-inter w-full bg-[#1d1b1b] text-sm text-[#b4b4b4] rounded-lg border-2 border-[#2d2b30] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descreva a sua duvida"
                  required
                  {...register("descricao")}>
                </textarea>
                <div className="flex flex-row gap-4 mt-8">
                  <button type="button" className="cursor-pointer text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-[#247c3a] to-[#42e242]">Comprar Curso</button>
                  <button type="submit" onClick={handleSubmit(enviaDuvida)} className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Enviar Duvida</button>
                </div>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl font-inter tracking-tight text-[#ccc] dark:text-white">
              📢 Se interressou pelo nosso Curso? <Link to="/cadCliente" className="text-blue-500 underline font-semibold">Cadastre-se</Link> agora e tire suas duvidas conosco!
            </h2>
          }
        </div>
      </section>
    </div>
  )
}