import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit  } from "react-icons/fa"
import type { DuvidaType } from "../../utils/DuvidaType"
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner"

type listaDuvidaProps = {
  duvida: DuvidaType,
  duvidas: DuvidaType[],
  setDuvidas: React.Dispatch<React.SetStateAction<DuvidaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProposta({ duvida, duvidas, setDuvidas }: listaDuvidaProps) {

  const { admin } = useAdminStore()

  async function excluirDuvida() {

    if (confirm(`Confirma Exclusão da Duvida "${duvida.descricao}"?`)) {
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
        toast.success("Duvida excluída com sucesso")
      } else {
        toast.error("Erro... Duvida não foi excluída")
      }
    }
  }

  async function responderDuvida() {
    const respostaAdmin = prompt(`Resposta da Revenda para "${duvida.descricao}"`)

    if (respostaAdmin == null || respostaAdmin.trim() == "") {
      return
    }

    const response = await fetch(`${apiUrl}/duvidas/${duvida.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({resposta: respostaAdmin})
      },
    )

    if (response.status == 200) {
      const duvidas2 = duvidas.map(x => {
        if (x.id == duvida.id) {
          return { ...x, resposta: respostaAdmin}
        }
        return x
      })
      setDuvidas(duvidas2)
    }
  }

  return (
    <tr key={duvida.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={duvida.curso.foto} alt="Foto do Curso"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {duvida.curso.titulo}
      </td>
      <td className={"px-6 py-4"}>
        {Number(duvida.curso.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
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
          <>
            <img src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={excluirDuvida} />&nbsp;
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
              onClick={responderDuvida} />
          </>
        }
      </td>
    </tr>
  )
}