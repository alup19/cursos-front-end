import { TiDeleteOutline } from "react-icons/ti"
import { FaListOl } from "react-icons/fa6";
import { useAdminStore } from "../context/AdminContext"

import type { AdminType } from "../../utils/AdminType"
import { toast } from "sonner";

type listaCarroProps = {
  adminLinha: AdminType;
  admins: AdminType[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemAdmin({ adminLinha, admins, setAdmins }: listaCarroProps) {
  const { admin } = useAdminStore()

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

    if (confirm(`Confirma a exclusão`)) {
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
        toast.success("Admin excluído com sucesso")
      } else {
        toast.error("Erro... Admin não foi excluído")
      }
    }
  }

  async function alterarNivel() {

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

    const nivel = Number(prompt("Novo Nível do Admin?"))

    if (nivel < 1 || nivel > 5) {
      toast.error("Erro... Nível deve ser entre 1 e 5")
      return
    }

    const response = await fetch(`${apiUrl}/admins/nivel/${adminLinha.id}/${nivel}`,
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
          return { ...x, nivel: nivel }
        }
        return x
      })
      setAdmins(admins2)
    }
  }

  return (
    <tr key={adminLinha.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
          onClick={excluirAdmin} />&nbsp;
        <FaListOl className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Alterar Nível"
          onClick={alterarNivel} />
      </td>
    </tr>
  )
}