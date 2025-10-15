import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useEffect } from "react"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    nome: string
    email: number
    nivel: number
    senha: string
    confirmaSenha: string
}

export default function AdminNovoAdmin() {

    const { admin } = useAdminStore()
    const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
    const navigate = useNavigate()

    useEffect(() => {
        setFocus("nome")
    }, [])

    async function CadAdmin(data: Inputs) {
        
        const novoAdmin: Inputs = {
            nome: data.nome,
            email: data.email,
            nivel: Number(data.nivel),
            senha: data.senha,
            confirmaSenha: data.confirmaSenha
        }

        if (novoAdmin.senha != novoAdmin.confirmaSenha) {
            toast.error("Erro... As senhas digitada não estão iguais")
            return
        }

        const response = await fetch(`${apiUrl}/admins`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${admin.token}`
                },
                body: JSON.stringify(novoAdmin)
            })

            if (response.status == 201) {
                toast.success("Novo admin cadastrado com sucesso!")
                reset()

                navigate("/admin/cadAdmin")
            } else {
                // console.log(response.statusText);
                toast.error("Erro... Não foi possivel criar a conta admin")
            }
        }

    return (
        <div className="container mt-24">
            <h2 className="mb-4 text-3xl font-semibold font-inter leading-none tracking-tight text-[#fff] md:text-3xl">Cadastro de Admin</h2>
            <form action="" onSubmit={handleSubmit(CadAdmin)} className="flex flex-col gap-8 items-center">
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem] font-inter">Nome</label>
                                <input type="text" id="nome" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("nome")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem] font-inter">Nivel de Permissão</label>
                                <input type="number" id="nivel" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required placeholder="1 - 5" {...register("nivel")} />
                            </div>
                        </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem] font-inter">Email</label>
                                <input type="text" id="email" className="text-white px-2 w-[33rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("email")} />
                            </div>
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem] font-inter">Senha</label>
                                <input type="password" id="senha" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("senha")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem] font-inter">Confirmar Senha</label>
                                <input type="password" id="confirmaSenha" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("confirmaSenha")} />
                            </div>
                        </div>
                        
                        <input type="submit" value="Registrar Admin" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                </form>
        </div>
    )
}