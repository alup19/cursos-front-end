import { TiDeleteOutline } from "react-icons/ti"

import type { TipoCursoType } from "../../utils/TipoCursoType";
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";
import Modal from "./ModalAdmin";
import { useState } from "react";

interface listaTipoCursoProps {
  tipoCurso: TipoCursoType;
  tiposCursos: TipoCursoType[];
  setTiposCursos: React.Dispatch<React.SetStateAction<TipoCursoType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemTipoCurso({ tipoCurso, tiposCursos, setTiposCursos }: listaTipoCursoProps) {
  const { admin } = useAdminStore()
  const [openExcluir, setOpenExcluir] = useState(false)

  async function excluirTipoCurso() {
    if (!admin || admin.nivel < 2) {
      toast.error("Você não tem permissão para excluir tipos de curso");
      return;
    }

    const response = await fetch(`${apiUrl}/tiposcursos/${tipoCurso.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const tiposcursos2 = tiposCursos.filter(x => x.id != tipoCurso.id)
      setTiposCursos(tiposcursos2)
      setOpenExcluir(false)
      toast.success("Tipo de curso excluído com sucesso")
    } else {
      setOpenExcluir(false)
      toast.error("Erro... Tipo de curso não foi excluído")
    }
  }

  return (
    <tr key={tipoCurso.id} className="odd:bg-[#252525] text-white font-inter even:bg-[#333333] border-b border-gray-700">
      <td className="px-6 py-4">
        {tipoCurso.id}
      </td>
      <td className="px-6 py-4">
        {tipoCurso.nome}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={() => setOpenExcluir(true)} />&nbsp;
      </td>
      <Modal open={openExcluir} onClose={() => setOpenExcluir(false)}>
        <div className="container ">
          <div className="container flex flex-col items-center">

            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Confirmar Exclusão
            </h2>

            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja excluir este Tipo de Curso?
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
                onClick={excluirTipoCurso}
                className="text-white bg-gradient-to-r from-[#8B1E1E] to-[#E34242] rounded-md px-6 py-2 text-[1rem] font-bold hover:opacity-90 transition cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </tr>
  )
}