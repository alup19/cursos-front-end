import './MinhasDuvidas.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { DuvidaType } from "./utils/DuvidaType";

const apiUrl = import.meta.env.VITE_API_URL

export default function Duvidas() {
    const [duvidas, setDuvidas] = useState<DuvidaType[]>([])
    const { cliente, logaCliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/duvidas/${cliente.id}`)
            const dados = await response.json()
            setDuvidas(dados)
        }
        buscaDados()
        
        async function buscaCliente(id: string) {
            const response = await fetch(`${apiUrl}/clientes/${id}`)
                const dados = await response.json()
                logaCliente(dados)  
            }
            if (localStorage.getItem("clienteKey")) {
                const idCliente = localStorage.getItem("clienteKey")
                buscaCliente(idCliente as string)
            }
    }, [cliente.id])

    function dataDMA(data: string) {
        if (data == null) {
            return "Data invalida"
        }

        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return dia + "/" + mes + "/" + ano
    }

    const duvidasTable = duvidas.map(duvida => (
        <tr key={duvida.id} className="border-b bg-[#a8a8a8] border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[#313131]">
                <p><b>{duvida.curso.titulo} {duvida.curso.tipoCurso.nome}</b></p>
                <p className='mt-3'>Duração: {duvida.curso.cargaHoraria} -
                    R$: {Number(duvida.curso.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
            </th>
            <td className="px-6 py-4">
                <img src={duvida.curso.foto} className="fotoCurso rounded-[0.5rem]" alt="Foto Curso" />
            </td>
            <td className="px-6 py-4 text-[#313131]">
                <p><b>{duvida.descricao}</b></p>
                <p><i>Enviado em: {dataDMA(duvida.created_At)}</i></p>
            </td>
            <td className="px-6 py-4">
                {duvida.resposta ?
                    <>
                        <p><b>{duvida.resposta}</b></p>
                        <p><i>Respondido em: {dataDMA(duvida.updated_At as string)}</i></p>
                    </>
                    :
                    <i>Aguardando...</i>}
            </td>
        </tr>
    ))

    return (
        <div className='h-[93.3vh] bg-[#10100F]'>
            <section className="max-w-7xl mx-auto">
                <h1 className="mb-6 pt-4 text-4xl font-bold leading-none tracking-tight text-white md:text-4xl lg:text-5xl dark:text-white">
                    Listagem de Duvidas
                </h1>
                {duvidas.length == 0 ?
                    <h2 className="mb-4 mt-10 text-4xl font-bold leading-none tracking-tight text-white md:text-4xl dark:text-white">
                        &nbsp;&nbsp; Ah... Você ainda não fez nenhuma pergunta sobre nossos cursos.
                    </h2>
                    :
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-[1rem] bg-[#c2c2c2] text-[#4f4f4f]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Curso
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Foto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Duvida
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Resposta
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {duvidasTable}
                        </tbody>
                    </table>
                }
            </section>
        </div>
    )
}