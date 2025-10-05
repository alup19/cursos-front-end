import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"

import type { CursoType } from "../../utils/CursoType"
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";

interface listaCursoProps {
  curso: CursoType;
  cursos: CursoType[];
  setCursos: React.Dispatch<React.SetStateAction<CursoType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCurso({ curso, cursos, setCursos }: listaCursoProps) {
  const { admin } = useAdminStore()

  async function excluirCurso() {
    if (!admin || admin.nivel < 2) {
      toast.error("Você não tem permissão para excluir cursos");
      return;
    }
    
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/cursos/${curso.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const cursos2 = cursos.filter(x => x.id != curso.id)
        setCursos(cursos2)
        toast.success("Curso excluído com sucesso")
      } else {
        toast.error("Não é possivel excluir esse curso")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${apiUrl}/cursos/destacar/${curso.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const cursos2 = cursos.map(x => {
        if (x.id == curso.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setCursos(cursos2)
    }
  }

  return (
    <tr key={curso.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={curso.foto} alt={`Foto do Curso`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${curso.destaque ? "font-extrabold" : ""}`}>
        {curso.titulo}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "font-extrabold" : ""}`}>
        {curso.professor.nome}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "font-extrabold" : ""}`}>
        {curso.tipoCurso.nome}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "font-extrabold" : ""}`}>
        {curso.cargaHoraria}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "font-extrabold" : ""}`}>
        {Number(curso.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCurso} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}