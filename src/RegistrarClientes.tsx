import { useForm } from "react-hook-form"

import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom"

import { toast } from "sonner"

type Inputs = {
    nome: string,
    email: string,
    cidade: string,
    telefone: string,
    senha: string,
    confirmaSenha: string
}

const apiUrl = import.meta.env.VITE_API_URL

export function RegistrarClientes() {
    const { register, handleSubmit } = useForm<Inputs>()

    const navigate = useNavigate()

    async function registraCliente(data: Inputs) {
        if (data.senha != data.confirmaSenha) {
            toast.error("Erro... As senhas digitada não estão iguais")
            return
        }

        const response = await 
              fetch(`${apiUrl}/clientes`, {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({ nome: data.nome, email: data.email, cidade: data.cidade, telefone: data.telefone, senha: data.senha })
              })
            
            if (response.status == 201) {
                toast.success("Conta criada com sucesso!")

                navigate("/login")
            } else {
                console.log(response.statusText);
                
                toast.error("Erro... Não foi possivel criar sua conta")
            }
        }

    return (
        <>
            <section className="flex justify-center items-center h-[93.3vh] w-[100vw] bg-[#10100F]">
                <div className="md:rounded-[0.63rem] md:border-[3px] md:w-[40.0625rem] md:h-[30.375rem] border-[#1C1B1D] p-8 flex flex-col justify-center items-center">
                    <Link to={"/"}><img src="./logo.png" alt="" /></Link>
                    <form action="" className="flex flex-col gap-8 items-center">
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Nome de Usuário</label>
                                <input type="text" id="nome" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("nome")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Email</label>
                                <input type="email" id="email" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("email")} />
                            </div>
                        </div>
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Cidade</label>
                                <input type="text" id="cidade" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("cidade")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Celular</label>
                                <input type="tel" id="telefone" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" placeholder="(00) 0000-0000"
                                    pattern="[0-9]{2} [0-9]{8,9}" required {...register("telefone")} />
                            </div>
                        </div>
                        <div className='flex flex-row gap-12'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Senha</label>
                                <input type="password" id="senha" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("senha")} />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className="text-[#756D6D] text-[0.9375rem]font-inter">Confirmar Senha</label>
                                <input type="password" id="confirmaSenha" className="text-white px-2 w-[14.875rem] h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem]" required {...register("confirmaSenha")} />
                            </div>
                        </div>

                        <input type="submit" onClick={handleSubmit(registraCliente)} value="Registrar-se" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                    </form>
                    <div className="flex flex-col items-center">
                        <p className="text-[#756D6D]">Já tem uma conta?</p>
                        <Link to={"/login"}><a href="" className="text-[#9D9999] text-[0.9375rem] font-inter">Fazer Login!</a></Link>
                    </div>
                </div>
            </section>
        </>
    );
}