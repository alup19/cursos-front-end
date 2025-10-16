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
            <Link to="/admin/cursos" className='absolute flex items-center justify-center top-28 text-white bg-[#572566] rounded-[0.6875rem] w-[8.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer hover:bg-[#a8459b] transition-colors'>
                Voltar
            </Link>
            <section className="flex min-h-[90vh] flex-row justify-center items-center">
                <div className="flex justify-center w-[45%] items-center">
                    <div className="md:rounded-[0.63rem] md:border-[3px] md:w-[30rem] md:h-[22rem] border-[#1C1B1D] flex flex-col gap-12 justify-center items-center">
                        <h2 className="text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff]">Inclusão de Tipo de Curso</h2>
                        <form onSubmit={handleSubmit(incluirTipoCurso)} className="flex flex-col justify-center" >
                            <label htmlFor="email" className="text-[#756D6D] text-[0.9375rem]font-inter">Nome para Tipo do Curso</label>
                            <input type="text" id="nome" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("nome")} />
                            <input type="submit" value="Registrar Tipo de Curso" className="text-white mt-12 bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.1rem] font-inter font-bold leading-normal cursor-pointer" />
                        </form>
                    </div>
                </div>
                <div className="w-[45%] sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs font-inter text-[#e5e5e5] uppercase bg-[#1a1a1a]">
                            <tr>
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
            </section>
        </>
    )
}