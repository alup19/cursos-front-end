import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import Modal from "./components/ModalAdmin"

import ItemProfessor from "./components/ItemProfessor"
import type { ProfessorType } from "../utils/ProfessorType"

import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  email: string
  telefone: string
}

export default function AdminProfessores() {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
  const [professores, setProfessores] = useState<ProfessorType[]>([])
  const { admin } = useAdminStore()
  const [open, setOpen] = useState(false)

  async function getProfessores() {
    const response = await fetch(`${apiUrl}/professores`)
    const dados = await response.json()
    setProfessores(dados)
  }
  useEffect(() => {
    getProfessores()
  }, [open, setFocus("nome")])

  async function incluirProfessor(data: Inputs) {

    const novoProfessor: Inputs = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone
    }

    const response = await fetch(`${apiUrl}/professores`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${admin.token}`
        },
        body: JSON.stringify(novoProfessor)
      })

    if (response.status == 201) {
      toast.success("Professor adicionado com sucesso!")
      reset()
      getProfessores()
      setOpen(false)
    } else {
      toast.error("Erro... Não foi possivel adicionar um novo Professor")
    }
  }

  const listaProfessores = professores.map(professor => (
    <ItemProfessor key={professor.id} professor={professor} professores={professores} setProfessores={setProfessores} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="text-3xl mb-4 font-semibold font-inter text-[#fff]">
          Cadastro de Professores
        </h1>
        <button className="text-white font-interfocus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer" onClick={() => setOpen(true)}>
          Novo Professor
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs font-inter text-[#e5e5e5] uppercase bg-[#1a1a1a]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Professor
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telefone
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaProfessores}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="container mt-24">
          <h2 className="mb-4 text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff] md:text-3xl dark:text-white">Inclusão de Professores</h2>
          <form action="" onSubmit={handleSubmit(incluirProfessor)} className="flex flex-col gap-8 items-center">
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col'>
                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Nome do Professor</label>
                <input type="text" id="nome" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("nome")} />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Email</label>
                <input type="email" id="email" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("email")} />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Telefone</label>
                <input type="tel" id="telefone" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("telefone")} />
              </div>
              <input type="submit" value="Registrar Professor" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}