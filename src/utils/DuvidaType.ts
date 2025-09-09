import type { CursoType } from "./CursoType"

export type DuvidaType = {
    id: number
    clienteId: string
    cursoId: number
    curso: CursoType
    descricao: string
    resposta: string | null
    created_At: string
    updated_At: string | null
}