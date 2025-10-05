import { TiDeleteOutline } from "react-icons/ti"

import type { ClienteType } from "../../utils/ClienteType";
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";

interface listaClienteProps {
  cliente: ClienteType;
  clientes: ClienteType[];
  setClientes: React.Dispatch<React.SetStateAction<ClienteType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCliente({ cliente, clientes, setClientes }: listaClienteProps) {
  const { admin } = useAdminStore()

  async function excluirCliente() {
    if (!admin || admin.nivel < 4) {
      toast.error("Você não tem permissão para excluir clientes");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/clientes/${cliente.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const clientes2 = clientes.filter(x => x.id != cliente.id)
        setClientes(clientes2)
        toast.success("Cliente excluído com sucesso")
      } else {
        toast.error("Erro... Cliente não foi excluído")
      }
    }
  }

  return (
    <tr key={cliente.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        {cliente.nome}
      </td>
      <td className="px-6 py-4">
        {cliente.email}
      </td>
      <td className="px-6 py-4">
        {cliente.telefone}
      </td>
      <td className="px-6 py-4">
        {cliente.cidade}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCliente} />&nbsp;
      </td>
    </tr>
  )
}