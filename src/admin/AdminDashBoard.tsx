import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const apiUrl = import.meta.env.VITE_API_URL

type graficoCursoType = {
  tipoCurso: string
  num: number
}

type graficoClienteType = {
  cidade: string
  num: number
}

type geralDadosType = {
  professores: number
  clientes: number
  cursos: number
  duvidas: number
}

export default function AdminDashboard() {
  const [cursoTipo, setCursoTipo] = useState<graficoCursoType[]>([])
  const [clientesCidade, setClientesCidade] = useState<graficoClienteType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoCursoTipo() {
      const response = await fetch(`${apiUrl}/dashboard/cursosTipo`)
      const dados = await response.json()
      setCursoTipo(dados)
    }
    getDadosGraficoCursoTipo()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

  const listaCursosTipo = cursoTipo.map(item => (
    { label: item.tipoCurso, value: item.num }
  ))

  const listaClientesCidade = clientesCidade.map(item => (
    { label: item.cidade, value: item.num }
  ))

  return (
    <div className="container mt-24 flex items-center justify-center flex-col">
      <h2 className="text-3xl font-semibold font-inter text-[#fff] mb-10">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-[#333333] bg-[#1a1a1a] flex items-center justify-center flex-col border rounded h-[6.5rem] w-1/3 me-3">
          <h3 className='font-inter pt-2 text-[1.1rem] font-semibold text-[#e5e5e5]'>Total de Professores:</h3>
          <span className='font-inter text-[1.5rem] font-semibold text-[#e5e5e5]'>
            {dados.professores}
          </span>
        </div>
        <div className="border-[#333333] bg-[#1a1a1a] flex items-center justify-center flex-col border rounded h-[6.5rem] w-1/3 me-3">
          <h3 className='font-inter pt-2 text-[1.1rem] font-semibold text-[#e5e5e5]'>Total de Clientes:</h3>
          <span className='font-inter text-[1.5rem] font-semibold text-[#e5e5e5]'>
            {dados.clientes}
          </span>
        </div>
        <div className="border-[#333333] bg-[#1a1a1a] flex items-center justify-center flex-col border rounded h-[6.5rem] w-1/3 me-3">
          <h3 className='font-inter pt-2 text-[1.1rem] font-semibold text-[#e5e5e5]'>Total de Cursos:</h3>
          <span className='font-inter text-[1.5rem] font-semibold text-[#e5e5e5]'>
            {dados.cursos}
          </span>
        </div>
        <div className="border-[#333333] bg-[#1a1a1a] flex items-center justify-center flex-col border rounded h-[6.5rem] w-1/3 me-3">
          <h3 className='font-inter pt-2 text-[1.1rem] font-semibold text-[#e5e5e5]'>Total de Dúvidas:</h3>
          <span className='font-inter text-[1.5rem] font-semibold text-[#e5e5e5]'>
            {dados.duvidas}
          </span>
        </div>
      </div>

      <div className='flex justify-center items-center flex-row gap-60 mt-20'>
        <div className='flex justify-center items-center flex-col'>
          <h2 className='text-3xl font-semibold font-inter text-[#fff]'>Cursos por Categoria</h2>
          <PieChart
            className='text-[#fff]'
            series={[{ data: listaCursosTipo }]}
            width={350}
            height={400}
            slotProps={{
              legend: { hidden: true } as any,
            }}
          />
        </div>
        <div className='flex justify-center items-center flex-col'>
          <h2 className='text-3xl font-semibold font-inter text-[#fff]'>Clientes por Cidade</h2>
          <PieChart
            className='text-[#fff]'
            series={[{ data: listaClientesCidade }]}
            width={350}
            height={400}
            slotProps={{
              legend: { hidden: true } as any,
            }}
          />
        </div>
      </div>
    </div>
  )
}