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
    <tr key={curso.id} className="odd:bg-[#252525] even:bg-[#333333] border-b border-gray-700">
      <th scope="row" className="px-6 py-4 font-inter whitespace-nowrap text-white">
        <img src={curso.foto} className="rounded-[0.5rem]" alt={`Foto do Curso`}
          style={{ width: 250, height: 100 }} />
      </th>
      <td className={`px-6 py-4 ${curso.destaque ? "" : ""}`}>
        {curso.titulo}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "" : ""}`}>
        {curso.professor.nome}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "" : ""}`}>
        {curso.tipoCurso.nome}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "" : ""}`}>
        {curso.cargaHoraria}
      </td>
      <td className={`px-6 py-4 ${curso.destaque ? "" : ""}`}>
        {Number(curso.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <div className="px-6 py-9 flex items-center">
        <TiDeleteOutline className="text-3xl text-red-600 w-[2rem] inline-block cursor-pointer" title="Excluir"
          onClick={excluirCurso} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 w-[1.6rem] inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </div>
    </tr>
  )
}