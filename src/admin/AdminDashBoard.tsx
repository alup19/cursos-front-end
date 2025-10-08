import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

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
    { x: item.tipoCurso, y: item.num }
  ))

  const listaClientesCidade = clientesCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-semibold font-inter text-[#fff]">Visão Geral do Sistema</h2>

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

      <div className="flex items-center justify-center gap-3">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaCursosTipo}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Curso", "por Tipo Curso"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaClientesCidade}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Clientes", "por Cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}