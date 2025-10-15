import { useAdminStore } from "../context/AdminContext"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaUsers } from "react-icons/fa6"
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import Modal from "./ModalAdmin";

export function MenuLateral() {
  const navigate = useNavigate()
  const { admin, deslogaAdmin } = useAdminStore()
  const [openSair, setOpenSair] = useState(false)

  function adminSair() {
    deslogaAdmin()
    navigate("/", { replace: true })
  }

  return (
    <>
      <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#262626]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/admin" className="flex items-center p-2">
                <span className="h-5 text-[#fff] text-2xl">
                  <BiSolidDashboard />
                </span>
                <span className="ms-2 mt-1 font-inter text-[#e5e5d9]">Visão Geral</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/cursos" className="flex items-center p-2">
                <span className="h-5 text-[#fff] text-2xl">
                  <IoMdAddCircleOutline />
                </span>
                <span className="ms-2 mt-1 font-inter text-[#e5e5d9]">Cadastro de Cursos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/professores" className="flex items-center p-2">
                <span className="h-5 text-[#fff] text-2xl">
                  <IoMdAddCircleOutline />
                </span>
                <span className="ms-2 mt-1 font-inter text-[#e5e5d9]">Cadastrar Professores</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/clientes" className="flex items-center p-2">
                <span className="h-5 text-[#fff] text-2xl">
                  <FaUsers />
                </span>
                <span className="ms-2 mt-1 font-inter text-[#e5e5d9]">Controle de Clientes</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/duvidas" className="flex items-center p-2 cursor-pointer">
                <span className="h-5 text-[#fff] text-2xl">
                  <AiOutlineMessage />
                </span>
                <span className="ms-2 mt-1 font-inter text-[#e5e5d9]">Controle de Duvidas</span>
              </Link>
            </li>
            {admin.nivel >= 3 &&
              <li>
                <Link to="/admin/cadAdmin" className="flex items-center p-2 cursor-pointer">
                  <span className="h-5 text-[#fff] text-2xl">
                    <FaRegUser />
                  </span>
                  <span className="ms-2 mt-1 font-inter text-[#e5e5d9]">Cadastro de Admins</span>
                </Link>
              </li>
            }
            <li>
              <span className="flex items-center p-2 cursor-pointer">
                <span className="h-5 text-[#fff] text-2xl">
                  <IoExitOutline />
                </span>
                <span className="ms-2 mt-1 font-inter text-[#e5e5d9]" onClick={() => setOpenSair(true)}>Sair do Sistema</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
      <Modal open={openSair} onClose={() => setOpenSair(false)}>
        <div className="container mt-24">
          <div className="container mt-10 flex flex-col items-center max w-[20rem]">
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
                onClick={adminSair}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}