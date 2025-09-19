import { useForm } from "react-hook-form"

import { Link } from 'react-router-dom'

import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner'
import { useClienteStore } from "./context/ClienteContext"

type Inputs = {
    email: string,
    senha: string,
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    const { logaCliente } = useClienteStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        const response = await
            fetch(`${apiUrl}/clientes/login`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ email: data.email, senha: data.senha })
            })

        if (response.status == 200) {
            const dados = await response.json()

            logaCliente(dados)

            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id)
            } else {
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

    return (
        <>
            <section className="flex justify-center items-center h-[93.3vh] bg-[#10100F]">
                <div className="md:rounded-[0.63rem] md:border-[3px] md:w-[30rem] md:h-[25rem] border-[#1C1B1D] flex flex-col justify-center items-center">
                    <form action="" className="flex flex-col justify-center" onSubmit={handleSubmit(verificaLogin)} >
                        <label htmlFor="email" className="text-[#756D6D] text-[0.9375rem]font-inter">E-mail</label>
                        <input type="email" id="email" className="w-[14.875rem] px-2 h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem] text-white"
                            required {...register("email")} />
                        <div className="flex justify-between pt-[2.38rem]">
                            <label htmlFor="password" className="text-[#756D6D] text-[0.9375rem] font-inter">Senha</label>
                            <a href="" className="text-[#9D9999]">Esqueceu sua senha?</a>
                        </div>
                        <input type="password" id="password" className="w-[14.875rem] px-2  h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem] text-white" required {...register("senha")} />
                        <div className="flex items-start pt-2">
                            <div className="flex items-center h-5">
                                <input id="remember"
                                    aria-describedby="remember" type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    {...register("manter")} />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Manter Conectado</label>
                            </div>
                        </div>
                        <input type="submit" value="Logar" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
                    </form>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[#756D6D]">Ainda não tem uma conta?</p>
                        <Link to={"/registro"}><a href="" className="text-[#9D9999] text-[0.9375rem] font-inter">Cadastre-se!</a></Link>
                    </div>
                </div>
            </section>
            <Toaster richColors position="top-right" />
        </>
    );
}