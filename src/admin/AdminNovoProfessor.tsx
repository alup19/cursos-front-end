import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useEffect } from "react"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    nome: string
    email: string
    telefone: string
}

export default function AdminNovoProfessor() {

    const { admin } = useAdminStore()
    const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
    const navigate = useNavigate()

    useEffect(() => {
        setFocus("nome")
    }, [])

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

                navigate("/admin/professores")
            } else {
                // console.log(response.statusText);
                toast.error("Erro... Não foi possivel adicionar um novo Professor")
            }
        }

    return (
        <div className="container mt-24">
            <h2 className="text-3xl mb-4 font-bold">Inclusão de Professores</h2>
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
                        <input type="tel" id="telefone" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]"  required {...register("telefone")} />
                    </div>
                    <input type="submit" value="Registrar Professor" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />    
                </div>
            </form>
        </div>
    )
}