import { TiDeleteOutline } from "react-icons/ti"

import type { TipoCursoType } from "../../utils/TipoCursoType";
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";

interface listaTipoCursoProps {
  tipoCurso: TipoCursoType;
  tiposCursos: TipoCursoType[];
  setTiposCursos: React.Dispatch<React.SetStateAction<TipoCursoType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemTipoCurso({ tipoCurso, tiposCursos, setTiposCursos }: listaTipoCursoProps) {
  const { admin } = useAdminStore()

  async function excluirTipoCurso() {
    if (!admin || admin.nivel < 2) {
      toast.error("Você não tem permissão para excluir tipos de curso");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
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
        toast.success("Tipo de curso excluído com sucesso")
      } else {
        toast.error("Erro... Tipo de curso não foi excluído")
      }
    }
  }

  return (
    <tr key={tipoCurso.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        {tipoCurso.id}
      </td>
      <td className="px-6 py-4">
        {tipoCurso.nome}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirTipoCurso} />&nbsp;
      </td>
    </tr>
  )
}