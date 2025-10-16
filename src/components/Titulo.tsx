import { Link, useNavigate } from "react-router-dom"
import { useClienteStore } from "../context/ClienteContext"
import Modal from "../admin/components/ModalAdmin"
import { useState } from "react"

export default function Titulo() {
  const { cliente, deslogaCliente } = useClienteStore()
  const navigate = useNavigate()
  const [openSair, setOpenSair] = useState(false)

  function clienteSair() {
    deslogaCliente()
    if (localStorage.getItem("clienteKey")) {
      localStorage.removeItem("clienteKey")
    }
    setOpenSair(false)
    navigate("/login")
  }

  return (
    <nav className="bg-[#10100F] dark:bg-[#10100F] dark:border-[#fff] ">
      <div className="w-[78vw] flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"}><img src="/orvion_logo.png" className="h-8" alt="Orvion Logo" /></Link>
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        </Link>
        <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              {cliente.id ?
                <>
                  <span className="text-[#f1eef1]">
                    {cliente.nome}
                  </span>&nbsp;&nbsp;
                  <Link to="/minhasDuvidas" className="text-white font-bold bg-gradient-to-r from-[#245A7C] to-[#42A4E2] focus:ring-2 focus:outline-none focus:ring-gray-400 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    Minhas Duvidas
                  </Link>&nbsp;&nbsp;
                  <span className="cursor-pointer font-bold text-[#f1eef1]"
                    onClick={() => setOpenSair(true)}>
                    Sair
                  </span>
                </>
                :
                <Link to="/login" className="block py-2 px-3 md:p-0 text-[#f1eef1] rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-[#f1eef1] md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Login
                </Link>
              }
            </li>
          </ul>
        </div>
      </div>
      <Modal open={openSair} onClose={() => setOpenSair(false)}>
        <div className="container">
          <div className="container flex flex-col items-center max w-[20rem]">
            <h2 className="mb-6 text-2xl font-semibold text-white text-center">
              Sair do Sistema
            </h2>
            <p className="text-[#bcbcbc] text-center mb-6">
              Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setOpenSair(false)}
                className="text-white bg-[#292727] rounded-md px-6 py-2 text-[1rem] hover:bg-[#3a3939] transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                className="text-white bg-gradient-to-r from-[#8B1E1E] to-[#E34242] rounded-md px-6 py-2 text-[1rem] font-bold hover:opacity-90 transition cursor-pointer"
                onClick={clienteSair}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </nav>
  )
}