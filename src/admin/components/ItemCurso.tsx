import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"

import type { CursoType } from "../../utils/CursoType"
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";
import Modal from "./ModalAdmin";
import { useState } from "react";

interface listaCursoProps {
  curso: CursoType;
  cursos: CursoType[];
  setCursos: React.Dispatch<React.SetStateAction<CursoType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCurso({ curso, cursos, setCursos }: listaCursoProps) {
  const { admin } = useAdminStore()
  const [openExcluir, setOpenExcluir] = useState(false)  

  async function excluirCurso() {
    if (!admin || admin.nivel < 2) {
      toast.error("Você não tem permissão para excluir cursos");
      return;
    }

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
        setOpenExcluir(false)
        toast.success("Curso excluído com sucesso")
      } else {
        setOpenExcluir(false)
        toast.error("Não é possivel excluir esse curso")
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
        <img src={curso.foto && curso.foto.trim() !== "" ? curso.foto : "/orvion_logo.png"} className="rounded-[0.5rem] object-fill" alt={`Foto do Curso`}
          style={{ width: 250, height: 100 }} />
      </th>
      <td className={`px-6 py-4 ${curso.destaque ? "font-bold text-yellow-500" : "font-bold text-white"}`}>
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
      <td className="px-2 py-15 flex items-center">
        <TiDeleteOutline className="text-3xl text-red-600 w-[2rem] inline-block cursor-pointer" title="Excluir"
          onClick={() => setOpenExcluir(true)} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 w-[1.6rem] inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
      <Modal open={openExcluir} onClose={() => setOpenExcluir(false)}>
        <div className="container">
          <div className="container flex flex-col items-center">

            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Confirmar Exclusão
            </h2>

            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja excluir este Curso?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setOpenExcluir(false)}
                className="text-white bg-[#292727] rounded-md px-6 py-2 text-[1rem] hover:bg-[#3a3939] transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={excluirCurso}
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