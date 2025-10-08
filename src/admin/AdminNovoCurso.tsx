import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { TipoCursoType } from "../utils/TipoCursoType"
import type { ProfessorType } from "../utils/ProfessorType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    titulo: string
    preco: number
    foto: string
    cargaHoraria: string
    descricao: string
    professorId: number
    tipoCursoId: number
    adminId: string
}

export default function AdminNovoCurso() {
    const [tiposcursos, setTiposCursos] = useState<TipoCursoType[]>([])
    const [professores, setProfessores] = useState<ProfessorType[]>([])
    const { admin } = useAdminStore()
    const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
    const navigate = useNavigate()

    useEffect(() => {
        async function getTiposCursos() {
            const response = await fetch(`${apiUrl}/tiposcursos`)
            const dados = await response.json()
            setTiposCursos(dados)
        }
        getTiposCursos()

        async function getProfessores() {
            const response = await fetch(`${apiUrl}/professores/`)
            const dados = await response.json()
            setProfessores(dados)
        }
        getProfessores()

        setFocus("titulo")
    }, [])

    const optionsTiposCursos = tiposcursos.map(tipocurso => (
        <option key={tipocurso.id} value={tipocurso.id}>{tipocurso.nome}</option>
    ))

    const optionsProfessores = professores.map(professor => (
        <option key={professor.id} value={professor.id}>{professor.nome}</option>
    ))

    async function incluirCurso(data: Inputs) {

        const novoCurso: Inputs = {
            titulo: data.titulo,
            preco: Number(data.preco),
            foto: data.foto,
            cargaHoraria: data.cargaHoraria,
            descricao: data.descricao,
            professorId: Number(data.professorId),
            tipoCursoId: Number(data.tipoCursoId),
            adminId: admin.id
        }

        const response = await fetch(`${apiUrl}/cursos`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admin.token}`
                },
                body: JSON.stringify(novoCurso)
            })

            if (response.status == 201) {
                toast.success("Curso criado com sucesso!")
                reset()

                navigate("/admin/cursos")
            } else {
                // console.log(response.statusText);
                toast.error("Erro... Não foi possivel criar este Curso")
            }
        }

    return (
        <div className="container mt-24">
            <h2 className="mb-4 text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff] md:text-3xl dark:text-white">Inclusão de Cursos</h2>
            <form action="" className="flex flex-col gap-8 items-center">
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Nome de Curso</label>
                                <input type="text" id="titulo" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("titulo")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Carga Horaria</label>
                                <input type="text" id="cargaHoraria" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("cargaHoraria")} />
                            </div>
                        </div>
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Preço</label>
                                <input type="number" id="preco" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("preco")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Imagem URL</label>
                                <input type="url" id="foto" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("foto")} />
                            </div>
                        </div>
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Professores</label>
                                <select id="professorId"
                                    className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required
                                    {...register("professorId")}>
                                    {optionsProfessores}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Tipos de Curso</label>
                                <select id="tipoCursoId"
                                    className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required
                                    {...register("tipoCursoId")}>
                                    {optionsTiposCursos}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col">
                        <label
                            htmlFor="descricao" className="text-[#756D6D] text-[0.9375rem] font-inter mb-1">
                            Descrição do Curso
                        </label>
                        <textarea
                            id="descricao"
                            className="text-white px-2 py-2 w-[33rem] h-[6rem] bg-[#0F0F0E] border-2 border-[#292727] rounded-[0.56rem] resize-none focus:outline-none focus:ring-2 focus:ring-[#756D6D] transition duration-200"
                            required
                            {...register("descricao")}/>
                        </div>
                        
                        <input type="submit" onClick={handleSubmit(incluirCurso)} value="Registrar Curso" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                    </form>
        </div>
    )
}