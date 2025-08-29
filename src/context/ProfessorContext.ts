import type { ProfessorType } from '../utils/ProfessorType'
import { create } from 'zustand'

type ProfessorStore = {
    professor: ProfessorType
    logaProfessor: (professorLogado: ProfessorType) => void
    deslogaProfessor: () => void
}

export const useProfessorStore = create<ProfessorStore>((set) => ({
    professor: {} as ProfessorType,
    logaProfessor: (professorLogado) => set({professor: professorLogado}),
    deslogaProfessor: () => set({professor: {} as ProfessorType})
}))