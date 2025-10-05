import { TiDeleteOutline } from "react-icons/ti"

import type { ProfessorType } from "../../utils/ProfessorType";
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";

interface listaProfessorProps {
  professor: ProfessorType;
  professores: ProfessorType[];
  setProfessores: React.Dispatch<React.SetStateAction<ProfessorType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProfessor({ professor, professores, setProfessores }: listaProfessorProps) {
  const { admin } = useAdminStore()

  async function excluirProfessor() {
    if (!admin || admin.nivel < 3) {
      toast.error("Você não tem permissão para excluir professores");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
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
        toast.error("Erro... Professor não pode ser excluído")
      }
    }
  }

  return (
    <tr key={professor.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
          onClick={excluirProfessor} />&nbsp;
      </td>
    </tr>
  )
}