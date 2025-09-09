import './MinhasDuvidas.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { DuvidaType } from "./utils/DuvidaType";

const apiUrl = import.meta.env.VITE_API_URL

export default function Duvidas() {
    const [duvidas, setDuvidas] = useState<DuvidaType[]>([])
    const { cliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/duvidas/${cliente.id}`)
            const dados = await response.json()
            setDuvidas(dados)
        }
        buscaDados()
    }, [])

    // para retornar apenas a data do campo no banco de dados
    // 2024-10-10T22:46:27.227Z => 10/10/2024
    function dataDMA(data: string) {
        if(data == null) {
            return "Data invalida"
        }

        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return dia + "/" + mes + "/" + ano
    }

    const duvidasTable = duvidas.map(duvida => (
        <tr key={duvida.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p><b>{duvida.curso.titulo} {duvida.curso.tipoCurso.nome}</b></p>
                <p className='mt-3'>Duração: {duvida.curso.cargaHoraria} -
                    R$: {Number(duvida.curso.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
            </th>
            <td className="px-6 py-4">
                <img src={duvida.curso.foto} className="fotoCurso" alt="Foto Curso" />
            </td>
            <td className="px-6 py-4">
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
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Minhas Duvidas</span></h1>

            {duvidas.length == 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                   &nbsp;&nbsp; Ah... Você ainda não fez nenhuma pergunta sobre nossos cursos. 🙄
                </h2>
                :
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
    )
}