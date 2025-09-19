import { Link } from "react-router-dom"
import type { CursoType } from "../utils/CursoType"

export function CardCursos({ data }: { data: CursoType }) {
    return (
        <div className="flex flex-col p-4 my-4 max-w-sm rounded-lg gap-3 shadow-sm items-centerbg-[#171717] border-[#4f4d50] border-1">
            <div className="flex flex-col items-center">
            <img src={data.foto} alt="Foto do Curso" className="w-[340px] h-[130px] object-cover rounded-[1rem]" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-[#e3dada] text-[1.2rem] font-medium font-inter tracking-tight">{data.titulo}</h1>
                <h2 className="text-white bg-gradient-to-r from-[#245A7C] to-[#42A4E2] text-center rounded-[0.6875rem] w-[6.8125rem] h-[1.75rem] text-[1rem] font-inter font-semibold leading-normal">{data.tipoCurso.nome}</h2>
            </div>
                <p className=" text-[#e3dada]">
                    Professor: <span className="font-bold text-[#fff]">{data.professor.nome}</span>
                </p>
            <div>
                <p className="text-[#e3dada]">
                    Preço R$: {Number(data.preco).toLocaleString("pt-br", {
                        minimumFractionDigits: 2
                    })}
                </p>
                <p className=" text-[#e3dada]">
                    Duração: {data.cargaHoraria} horas
                </p>
            </div>
            <Link to={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Ver Detalhes
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    )
}