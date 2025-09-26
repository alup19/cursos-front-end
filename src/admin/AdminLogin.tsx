import { useEffect } from "react"
import { useForm } from "react-hook-form"
// import { Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { useAdminStore } from "./context/AdminContext"

import { useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  email: string
  senha: string
}

export default function AdminLogin() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const navigate = useNavigate()
  const { logaAdmin } = useAdminStore()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${apiUrl}/admins/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha })
    })

    if (response.status == 200) {
      const admin = await response.json()
      logaAdmin(admin)
      navigate("/admin", { replace: true })
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    }
  }

  return (
    <>
      <section className="flex gap-7 flex-col justify-center items-center h-[100vh] bg-[#10100F]">
        <img src="../../orvion_logo2.png" alt="Orvion" style={{ width: 240 }}
          className="d-block" />
        <h1 className="text-3xl font-inter xl text-[#c9c9c9]">Admin: Orvion Cursos</h1>
        <div className="md:rounded-[0.63rem] md:border-[3px] md:w-[30rem] md:h-[25rem] border-[#1C1B1D] flex flex-col justify-center items-center">
          <form action="" className="flex flex-col justify-center" onSubmit={handleSubmit(verificaLogin)} >
            <label htmlFor="email" className="text-[#756D6D] text-[0.9375rem]font-inter">E-mail</label>
            <input type="email" id="email" className="w-[14.875rem] px-2 h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem] text-white"
              required {...register("email")} />
            <div className="flex justify-between pt-[2.38rem]">
              <label htmlFor="password" className="text-[#756D6D] text-[0.9375rem] font-inter">Senha</label>
            </div>
            <input type="password" id="password" className="w-[14.875rem] px-2  h-[2.25rem] bg-[#0F0F0E] border-[2px] border-[#292727] rounded-[0.56rem] text-white" required {...register("senha")} />
            <div className="flex items-start pt-2">
            </div>
            <input type="submit" value="Logar" className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] rounded-[0.6875rem] w-[14.8125rem] h-[2.375rem] text-[1.25rem] font-inter font-bold leading-normal cursor-pointer mt-[1.31rem] mb-[1.31rem]" />
          </form>
        </div>
      </section>
      <Toaster richColors position="top-right" />
    </>
  );
}