import type { TipoCursoType } from "./TipoCursoType"

export type CursoType = {
    id: number
    titulo: string
    preco: number
    foto: string
    cargaHoraria: string
    descricao: string
    destaque: boolean
    createdAt: Date
    updatedAt: Date
    tipoCursoId: number
    tipoCurso: TipoCursoType
}