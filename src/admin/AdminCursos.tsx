import { useForm } from "react-hook-form"

import { toast } from "sonner"

import { useAdminStore } from "../context/AdminContext.ts"

type Inputs = {
    titulo: string,
    preco: number,
    foto: string,
    cargaHoraria: string,
    descricao: string,
    professorID: number,
    tipoCursoID: number,
}


const apiUrl = import.meta.env.VITE_API_URL

export default function AdminCursos() {
    const { register, handleSubmit, reset } = useForm<Inputs>()
    const { admin } = useAdminStore()

    console.log(admin.id);

    async function registraCurso(data: Inputs) {
        const response = await 
              fetch(`${apiUrl}/cursos`, {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({ 
                    titulo: data.titulo,
                    preco: Number(data.preco),
                    foto: data.foto,
                    cargaHoraria: data.cargaHoraria,
                    descricao: data.descricao,
                    professorId: Number(data.professorID),
                    tipoCursoId: Number(data.tipoCursoID),
                    adminId: admin.id
                })
              })

            if (response.status == 201) {
                toast.success("Curso criado com sucesso!")
                reset()
            } else {
                console.log(response.statusText);
                
                toast.error("Erro... Não foi possivel criar este Curso")
            }
        }

    return (
        <div className="container mt-24">
            <h2 className="text-3xl mb-4 font-bold">Cadastro e Ajuste dos Cursos</h2>
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
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Professor ID</label>
                                <input type="number" id="professorID" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("professorID")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Tipo Curso ID</label>
                                <input type="number" id="tipoCursoID" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("tipoCursoID")} />
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
                        
                        <input type="submit" onClick={handleSubmit(registraCurso)} value="Registrar-se" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                    </form>
            
        </div>
    )
}