import type { ProfessorType } from "./ProfessorType"
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
    professorId: number
    professor: ProfessorType
    tipoCursoId: number
    tipoCurso: TipoCursoType
}