import { TiDeleteOutline } from "react-icons/ti"

import type { ClienteType } from "../../utils/ClienteType";
import { useAdminStore } from "../context/AdminContext"
import { toast } from "sonner";
import Modal from "./ModalAdmin";
import { useState } from "react";

interface listaClienteProps {
  cliente: ClienteType;
  clientes: ClienteType[];
  setClientes: React.Dispatch<React.SetStateAction<ClienteType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCliente({ cliente, clientes, setClientes }: listaClienteProps) {
  const { admin } = useAdminStore()
  const [openExcluir, setOpenExcluir] = useState(false)

  async function excluirCliente() {
    if (!admin || admin.nivel < 4) {
      toast.error("Você não tem permissão para excluir clientes");
      return;
    }

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
      setOpenExcluir(false)
      toast.error("Erro... Cliente não foi excluído")
    }
  }

  return (
    <tr key={cliente.id} className="odd:bg-[#252525] font-inter text-white even:bg-[#333333] border-b border-gray-700">
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
          onClick={() => setOpenExcluir(true)} />&nbsp;
      </td>
      <Modal open={openExcluir} onClose={() => setOpenExcluir(false)}>
        <div className="container">
          <div className="container flex flex-col items-center">

            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Confirmar Exclusão
            </h2>

            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja excluir este Cliente?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setOpenExcluir(false)}
                className="text-white bg-[#292727] rounded-md px-6 py-2 text-[1rem] hover:bg-[#3a3939] transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={excluirCliente}
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