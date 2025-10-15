import { TiDeleteOutline } from "react-icons/ti"

import type { ProfessorType } from "../../utils/ProfessorType";
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";
import Modal from "./ModalAdmin";
import { useState } from "react";

interface listaProfessorProps {
  professor: ProfessorType;
  professores: ProfessorType[];
  setProfessores: React.Dispatch<React.SetStateAction<ProfessorType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProfessor({ professor, professores, setProfessores }: listaProfessorProps) {
  const { admin } = useAdminStore()
  const [openExcluir, setOpenExcluir] = useState(false)

  async function excluirProfessor() {
    if (!admin || admin.nivel < 3) {
      toast.error("Você não tem permissão para excluir professores");
      return;
    }

    const response = await fetch(`${apiUrl}/professores/${professor.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const professores2 = professores.filter(x => x.id != professor.id)
      setProfessores(professores2)
      toast.success("Professor excluído com sucesso")
    } else {
      setOpenExcluir(false)
      toast.error("Erro... Professor não pode ser excluído")
    }
  }

  return (
    <tr key={professor.id} className="odd:bg-[#252525] font-inter text-white even:bg-[#333333] border-b border-gray-700">
      <td className="px-6 py-4">
        {professor.nome}
      </td>
      <td className="px-6 py-4">
        {professor.email}
      </td>
      <td className="px-6 py-4">
        {professor.telefone}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={() => setOpenExcluir(true)} />&nbsp;
      </td>
      <Modal open={openExcluir} onClose={() => setOpenExcluir(false)}>
        <div className="container">
          <div className="container flex flex-col items-center">

            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Confirmar Exclusão
            </h2>

            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja excluir este Professor?
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
                onClick={excluirProfessor}
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