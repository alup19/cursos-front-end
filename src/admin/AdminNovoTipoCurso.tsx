import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useAdminStore } from "./context/AdminContext"
import ItemTipoCurso from "./components/ItemTipoCurso"
import type { TipoCursoType } from "../utils/TipoCursoType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    nome: string
}

export default function AdminNovoTipoCurso() {

    const { admin } = useAdminStore()
    const [tiposcursos, setTiposCursos] = useState<TipoCursoType[]>([])
    const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

    async function getTiposCursos() {
        const response = await fetch(`${apiUrl}/tiposcursos`)
        const dados = await response.json()
        setTiposCursos(dados)
    }
    useEffect(() => {
        getTiposCursos()
        setFocus("nome")
    }, [])
    
    const listaTipoCurso = tiposcursos.map(tipocurso => (
        <ItemTipoCurso key={tipocurso.id} tipoCurso={tipocurso} tiposCursos={tiposcursos} setTiposCursos={setTiposCursos} />
    ))

    async function incluirTipoCurso(data: Inputs) {
        
        const novoTipoCurso: Inputs = {
            nome: data.nome,
        }

        const response = await fetch(`${apiUrl}/tiposcursos`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admin.token}`
                },
                body: JSON.stringify(novoTipoCurso)
            })

            if (response.status == 201) {
                toast.success("Tipo de Curso adicionado com sucesso!")
                reset()
                getTiposCursos()
            } else {
                // console.log(response.statusText);
                toast.error("Erro... Não foi possivel adicionar esse novo tipo de curso")
            }
        }

    return (
        <>
            <div className="flex justify-between">
                <div className="container mt-24">
                    <div className="flex">
                        <Link to="/admin/cursos"
                                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                  Voltar
                        </Link>
                        <h2 className="mb-4 text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff] md:text-3xl dark:text-white">Inclusão de Tipo de Curso</h2>
                    </div>
                    <form action="" onSubmit={handleSubmit(incluirTipoCurso)} className="flex flex-col gap-8 items-center my-24">
                        <div className='flex flex-col gap-8'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Nome para Tipo do Curso</label>
                                <input type="text" id="nome" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("nome")} />
                            </div>
                            <input type="submit" value="Registrar Tipo de Curso" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                        </div>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mt-24">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo de Curso
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ações
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaTipoCurso}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}