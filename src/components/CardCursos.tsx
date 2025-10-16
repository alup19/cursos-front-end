import { Link } from "react-router-dom"
import type { CursoType } from "../utils/CursoType"

export function CardCursos({ data }: { data: CursoType }) {
    return (
        <div className="flex flex-col p-4 my-4 max-w-sm rounded-lg gap-3 bg-[#171717] border-[#4f4d50] border-1">
            {data.destaque == true ?
                <div className="absolute ml-[15.8rem] mt-[0.3rem] flex flex-row items-center gap-2 bg-[#8a8211] rounded-[1rem] px-3 py">
                    <p className="font-inter text-white pt-[0.1rem] font-semibold text-[0.8rem]">Destaque</p>
                </div>
                :
                <>
                </>
            }
            <div className="flex flex-col items-center">
                <img src={data.foto && data.foto.trim() !== "" ? data.foto : "/orvion_logo.png"} alt="Foto do Curso" className="w-[340px] h-[130px] object-contain rounded-[1rem]" />
            </div>
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-[#e3dada] text-[1.2rem] font-medium font-inter tracking-tight">{data.titulo}</h1>
                <h2 className="text-white flex justify-center items-center bg-gradient-to-r from-[#245A7C] to-[#42A4E2] text-center rounded-[0.6875rem] w-[6.8125rem] h-[1.85rem] text-[1rem] font-inter font-normal leading-normal">{data.tipoCurso.nome}</h2>
            </div>
            <div className="flex justify-between">
                <p className=" text-[#e3dada]">
                    Professor: <span className="font-bold text-[#fff]">{data.professor.nome}</span>
                </p>
            </div>
            <div className="">
                <p className="text-[#e3dada]">
                    <span className="font-bold text-[#fff]">Preço R$:</span> {Number(data.preco).toLocaleString("pt-br", {
                        minimumFractionDigits: 2
                    })}
                </p>
                <p className=" text-[#e3dada]">
                    <span className="font-bold text-[#fff]">Duração:</span> {data.cargaHoraria} horas
                </p>
            </div>
            <Link to={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2  text-white bg-[#572566] rounded-[0.6875rem] h-[2.775rem] text-[0.9rem] font-inter font-bold leading-normal cursor-pointer hover:bg-[#a8459b] transition-colors">
                Ver Detalhes
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    )
}