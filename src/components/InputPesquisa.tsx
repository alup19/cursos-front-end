import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { CursoType } from "../utils/CursoType";

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    termo: string
}

type InputPesquisaProps = {
    setCursos: React.Dispatch<React.SetStateAction<CursoType[]>>
}

export function InputPesquisa({ setCursos }: InputPesquisaProps) {
    const { register, handleSubmit, reset } = useForm<Inputs>()

    async function enviaPesquisa(data: Inputs) {
        if (data.termo.length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres")
            return
        }

        const response = await fetch(`${apiUrl}/cursos/pesquisa/${data.termo}`)
        const dados = await response.json()
        setCursos(dados)
    }

    async function mostraDestaques() {
        const response = await fetch(`${apiUrl}/cursos/destaques`)
        const dados = await response.json()
        reset({ termo: "" })
        setCursos(dados)
    }

    return (
        <div className="flex justify-center items-center w-[98vw]">
            <div className="flex min-w-[75vw] mt-6 justify-center">
                <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm border font-inter rounded-lg bg-[#10100F] focus:ring-blue-500 focus:border-blue-500 dark:[#4f4d50] border-gray-600 placeholder-[#fff] text-[#fff]"
                            placeholder="Informe nome do curso, tipo ou valor máximo" required
                            {...register('termo')} />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5  bg-[#245A7C] cursor-pointer hover:bg-[#3d96ce] transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                            Pesquisar
                        </button>
                    </div>
                </form>
                <button type="button" className="ms-3 mt-1 flex items-center justify-center text-white bg-[#572566] rounded-[0.6875rem] w-[8.8125rem] h-[2.775rem] text-[0.9rem] font-inter font-bold leading-normal cursor-pointer hover:bg-[#a8459b] transition-colors"
                    onClick={mostraDestaques}>
                    Exibir Destaques
                </button>
            </div>
        </div>
    )
}