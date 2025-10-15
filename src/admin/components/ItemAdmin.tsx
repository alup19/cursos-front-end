import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TiDeleteOutline } from "react-icons/ti"
import { FaListOl } from "react-icons/fa6";

import Modal from "./ModalAdmin";

import { useAdminStore } from "../context/AdminContext"
import type { AdminType } from "../../utils/AdminType"

type listaCarroProps = {
  adminLinha: AdminType;
  admins: AdminType[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nivel: number
}

export default function ItemAdmin({ adminLinha, admins, setAdmins }: listaCarroProps) {
  const { admin } = useAdminStore()
  const [openAlterar, setOpenAlterar] = useState(false)
  const [openExcluir, setOpenExcluir] = useState(false)
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  
  async function excluirAdmin() {
    if (!admin || admin.nivel < 3) {
      toast.error("Você não tem permissão para Excluir ADMs");
      return;
    }
    
    if (adminLinha.id == admin.id) {
      toast.error("Você não Excluir sua propria conta")
      return
    }
    
    if (adminLinha.nivel >= admin.nivel && adminLinha.nivel === 5) {
      toast.error("Você num pode Excluir um ADM de mesmo nivel ou superior")
      return
    }

    const response = await fetch(`${apiUrl}/admins/${adminLinha.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )
    
    if (response.status == 200) {
      const admins2 = admins.filter(x => x.id != adminLinha.id)
      setAdmins(admins2)
      reset()
      setOpenAlterar(false)
      toast.success("Admin excluído com sucesso")
    } else {
      setOpenExcluir(false)
      toast.error("Erro... Admin não foi excluído")
    }
  }
  
  async function alterarNivel(data: Inputs) {
    
    if (!admin || admin.nivel < 3) {
      toast.error("Você não tem permissão para mudar niveis de ADMs");
      return;
    }
    
    if (adminLinha.id == admin.id) {
      toast.error("Você não pode mudar seu proprio nivel")
      return
    }
    
    if (adminLinha.nivel >= admin.nivel && adminLinha.nivel === 5) {
      toast.error("Não é possivel alterar um ADM de mesmo nivel ou superior")
      return
    }
    
    if (data.nivel < 1 || data.nivel > 5) {
      toast.error("Erro... Nível deve ser entre 1 e 5")
      return
    }
    
    const response = await fetch(`${apiUrl}/admins/nivel/${adminLinha.id}/${data.nivel}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )
    
    if (response.status == 200) {
      const admins2 = admins.map(x => {
        if (x.id == adminLinha.id) {
          return { ...x, nivel: data.nivel }
        }
        return x
      })
      setAdmins(admins2)
      reset()
      setOpenAlterar(false)
      toast.success("Nivel de permissão alterado com sucesso!")
    } else {
      setOpenExcluir(false)
      toast.error("Erro... Nivel de permissão não foi alterado")
    }
  }
  useEffect(() => {
     if (openAlterar) {
      setTimeout(() => setFocus("nivel"), 100)
    }
  }, [openAlterar])
  
  return (
    <tr key={adminLinha.id} className="odd:bg-[#252525] even:bg-[#333333] border-b border-gray-700 font-inter text-white font-medium">
      <td className={`px-6 py-4`}>
        {adminLinha.nome}
      </td>
      <td className={`px-6 py-4`}>
        {adminLinha.email}
      </td>
      <td className={`px-6 py-4`}>
        {adminLinha.nivel}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={() => setOpenExcluir(true)} />&nbsp;
        <FaListOl className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Alterar Nível"
          onClick={() => setOpenAlterar(true)} />
      </td>
      <Modal open={openExcluir} onClose={() => setOpenExcluir(false)}>
        <div className="container mt-24">
          <div className="container mt-10 flex flex-col items-center">
            <button
              className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-100 hover:text-gray-600"
            >
            </button>

            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Confirmar Exclusão
            </h2>

            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja excluir este admin?
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
                onClick={excluirAdmin}
                className="text-white bg-gradient-to-r from-[#8B1E1E] to-[#E34242] rounded-md px-6 py-2 text-[1rem] font-bold hover:opacity-90 transition cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openAlterar} onClose={() => setOpenAlterar(false)}>
        <div className="flex flex-col container mt-24 items-center justify-center">
          <h2 className="mb-4 text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff] md:text-3xl dark:text-white">Alterar Permissão do Admin</h2>
          <form action="" onSubmit={handleSubmit(alterarNivel)} className="flex flex-col gap-8 items-center">
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col'>
                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Novo Nivel</label>
                <input type="number" id="nivel" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("nivel")} />
              </div>
              <div className="flex flex-col">
                <input type="submit" value="Salvar Nivel" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
              </div>
            </div>
          </form>
                <button
                  onClick={() => setOpenAlterar(false)}
                  className="text-white bg-[#292727] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal hover:bg-[#3a3939] transition cursor-pointer"
                >
                  Cancelar
                </button>
        </div>
      </Modal>
    </tr>
  )
}