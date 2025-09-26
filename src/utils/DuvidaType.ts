import type { ClienteType } from "./ClienteType"
import type { CursoType } from "./CursoType"

export type DuvidaType = {
    id: number
    clienteId: string
    cliente: ClienteType
    cursoId: number
    curso: CursoType
    descricao: string
    resposta: string | null
    created_At: string
    updated_At: string | null
}