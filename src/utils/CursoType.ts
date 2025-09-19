import type { TipoCursoType } from "./TipoCursoType"
import type { ProfessorType } from "./ProfessorType"

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
    professorId: number
    professor: ProfessorType
}