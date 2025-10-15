import { TiDeleteOutline } from "react-icons/ti"
import { FaCheck } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa"
import type { DuvidaType } from "../../utils/DuvidaType"
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner"
import Modal from "./ModalAdmin"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import orvionLogo from "../../../public/orvion_logo.png";

type listaDuvidaProps = {
  duvida: DuvidaType,
  duvidas: DuvidaType[],
  setDuvidas: React.Dispatch<React.SetStateAction<DuvidaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  resposta: string
}


export default function ItemDuvida({ duvida, duvidas, setDuvidas }: listaDuvidaProps) {

  const { admin } = useAdminStore()
  const [openExcluir, setOpenExcluir] = useState(false)
  const [openResponder, setOpenResponder] = useState(false)
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  async function excluirDuvida() {

    const response = await fetch(`${apiUrl}/duvidas/${duvida.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const duvidas2 = duvidas.filter(x => x.id != duvida.id)
      setDuvidas(duvidas2)
      setOpenExcluir(false)
      toast.success("Duvida excluída com sucesso")
    } else {
      setOpenExcluir(false)
      toast.error("Erro... Duvida não foi excluída")
    }
  }

  async function responderDuvida(data: Inputs) {

    if (data.resposta.length > 100) {
      toast.error("Erro... Resposta muito grande para ser enviada")
      return
    }

    if (data.resposta == null || data.resposta.trim() == "") {
      return
    }

    const response = await fetch(`${apiUrl}/duvidas/${duvida.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({ resposta: data.resposta })
      },
    )

    if (response.status == 200) {
      const duvidas2 = duvidas.map(x => {
        if (x.id == duvida.id) {
          return { ...x, resposta: data.resposta }
        }
        return x
      })
      setDuvidas(duvidas2)
      reset()
      setOpenResponder(false)
      toast.success("Resposta enviada com sucesso")
    } else {
      reset()
      setOpenResponder(false)
      toast.error("Erro... Não foi possivel enviar sua resposta")
    }
  }

  useEffect(() => {
    if (openResponder) {
      setTimeout(() => setFocus("resposta"), 100)
    }
  }, [openResponder])

  return (
    <tr key={duvida.id} className="odd:bg-[#252525] font-inter text-white even:bg-[#333333] border-b border-gray-700">
      <th scope="row" className="px-6 py-4 font-inter whitespace-nowrap text-white">
        <img src={duvida.curso.foto && duvida.curso.foto.trim() !== "" ? duvida.curso.foto : orvionLogo} className="rounded-[0.5rem] object-contain" alt="Foto do Curso"
          style={{ width: 250, height: 100 }} />
      </th>
      <td className={"px-6 py-4"}>
        {duvida.curso.titulo}
      </td>
      <td className={"px-6 py-4"}>
        {Number(duvida.curso.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className={`px-6 py-4`}>
        {duvida.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {duvida.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {duvida.resposta}
      </td>
      <td className="px-6 py-4">
        {duvida.resposta ?
          <div className="flex items-center">
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={() => setOpenExcluir(true)} />&nbsp;
            <FaCheck className="text-3xl text-green-500 inline-block w-[27px]" title="Excluir" />&nbsp;
          </div>
          :
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={() => setOpenExcluir(true)} />&nbsp;
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
              onClick={() => setOpenResponder(true)} />
          </>
        }
      </td>
      <Modal open={openExcluir} onClose={() => setOpenExcluir(false)}>
        <div className="container">
          <div className="container flex flex-col items-center">

            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Confirmar Exclusão
            </h2>

            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja excluir esta Duvida?
              Essa ação não poderá ser desfeita.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setOpenExcluir(false)}
                className="text-white bg-[#292727] rounded-md px-6 py-2 text-[1rem] hover:bg-[#3a3939] transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={excluirDuvida}
                className="text-white bg-gradient-to-r from-[#8B1E1E] to-[#E34242] rounded-md px-6 py-2 text-[1rem] font-bold hover:opacity-90 transition cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openResponder} onClose={() => setOpenResponder(false)}>
        <div className="flex flex-col container">
          <h2 className="mb-4 text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff] md:text-3xl dark:text-white">Resposta para duvida de {duvida.cliente.nome}</h2>
          <div className="flex flex-col justify-center items-center">
            <form action="" onSubmit={handleSubmit(responderDuvida)} className="flex flex-col gap-8">
              <div className='flex flex-col gap-3 justify-center items-center'>
                <div className='flex flex-col'>
                  <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Escreva sua Resposta</label>
                  <textarea
                    id="resposta"
                    className="text-white px-2 py-2 w-[33rem] h-[6rem] bg-[#0F0F0E] border-2 border-[#292727] rounded-[0.56rem] resize-none focus:outline-none focus:ring-2 focus:ring-[#756D6D] transition duration-200"
                    required
                    {...register("resposta")} />
                </div>
                <div className="flex flex-row items-center gap-8">
                  <input type="submit" value="Responder" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[13.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                  <button onClick={() => setOpenResponder(false)} className="text-white bg-[#292727] rounded-[0.6875rem] w-[13.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal hover:bg-[#3a3939] transition cursor-pointer">Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </tr>
  )
}