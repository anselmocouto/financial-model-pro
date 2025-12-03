import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { simulationService } from '../services/supabaseService';
import { ArrowLeft, Calendar, TrendingUp, Award } from 'lucide-react';

import { KPICards } from '../components/model/KPICards';
import { IndicatorAnalysis } from '../components/model/IndicatorAnalysis';
import { ChartsTab } from '../components/model/ChartsTab';
import { TablesTab } from '../components/model/TablesTab';
import { BarChart3, Table2 } from "lucide-react";

export const ModelViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('charts');
  const [showAnalysis, setShowAnalysis] = useState(false); // Estado para controlar análise

 
  useEffect(() => {
    loadSimulation();
  }, [id]);

  const loadSimulation = async () => {
    try {
      const data = await simulationService.getSimulation(id);
      setSimulation(data);
    } catch (error) {
      console.error('Erro ao carregar simulação:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!simulation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Simulação não encontrada</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const scenarioColors = {
    base: "bg-blue-100 text-blue-800 border-blue-300",
    optimistic: "bg-green-100 text-green-800 border-green-300",
    pessimistic: "bg-red-100 text-red-800 border-red-300",
  };

  const scenarioIcons = {
    base: TrendingUp,
    optimistic: Award,
    pessimistic: Calendar,
  };

  const scenarioLabels = {
    base: "Cenário Base",
    optimistic: "Cenário Otimista",
    pessimistic: "Cenário Pessimista",
  };

  const ScenarioIcon = scenarioIcons[simulation.scenario] || TrendingUp;

  // Preparar modelData para os componentes
  const modelData = {
    npvEquity: simulation.summary.npvEquity || 0,
    irrEquity: simulation.summary.irrEquity || 0,
    moic: simulation.summary.moic || 0,
    npvProject: simulation.summary.npvProject || null,
    irrProject: simulation.summary.irrProject || null,
    projection: simulation.projection,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      
      {/* HEADER - ARREDONDADO E ESTILIZADO ✨ */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl mb-8 mx-8 mt-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-8 py-8">
          
          {/* Botão Voltar - ESTILIZADO ✨ */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl transition-all mb-6 border border-white/20 backdrop-blur-sm group shadow-md"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Voltar ao Dashboard</span>
          </button>

          {/* Título e Info */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mb-2 drop-shadow-sm">{simulation.name}</h1>
              <div className="flex items-center gap-4 text-blue-100">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(simulation.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Badge do Cenário */}
            <div className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 ${scenarioColors[simulation.scenario]} shadow-lg`}>
              <ScenarioIcon size={20} />
              <span className="font-bold text-lg">{scenarioLabels[simulation.scenario]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 space-y-8">
        
        {/* Badge de Modo Somente Leitura */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-sm text-yellow-800 font-semibold flex items-center gap-2">
            👁️ <strong>Modo de Visualização:</strong> As premissas desta simulação não podem ser editadas.
          </p>
        </div>

        {/* KPI Cards */}
        <KPICards modelData={modelData} inputs={simulation.inputs} />

        {/* BOTÃO PARA MOSTRAR/OCULTAR ANÁLISE */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={`
              group relative px-8 py-4 rounded-2xl font-bold text-lg shadow-xl
              transition-all duration-300 transform hover:scale-105
              ${showAnalysis 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              }
            `}
          >
            <span className="flex items-center gap-3">
              {showAnalysis ? (
                <>
                  <svg className="w-6 h-6 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Ocultar Análise dos Indicadores
                  <svg className="w-6 h-6 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Ver Análise e Interpretação dos Indicadores
                  <svg className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>

        {/* ANÁLISE E INTERPRETAÇÃO DOS INDICADORES - Condicional */}
        {showAnalysis && (
          <div className="animate-fadeIn">
            <IndicatorAnalysis modelData={modelData} inputs={simulation.inputs} />
          </div>
        )}

        {/* Grid: Premissas + Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Painel de Premissas (Somente Leitura) */}
          <div className="lg:col-span-1">
            <ReadOnlyInputsPanel inputs={simulation.inputs} />
          </div>

          {/* Tabs de Conteúdo */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
              
              {/* Abas */}
              <div className="flex bg-slate-100 border-b">
                <button
                  onClick={() => setActiveTab("charts")}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold transition ${
                    activeTab === "charts"
                      ? "bg-white border-b-4 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  Gráficos
                </button>

                <button
                  onClick={() => setActiveTab("tables")}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold transition ${
                    activeTab === "tables"
                      ? "bg-white border-b-4 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Table2 className="w-5 h-5" />
                  Demonstrativos
                </button>
              </div>

              {/* Conteúdo da Aba */}
              <div className="p-6">
                {activeTab === "charts" && <ChartsTab projection={simulation.projection} />}
                {activeTab === "tables" && <TablesTab projection={simulation.projection} inputs={simulation.inputs} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------
   COMPONENTE: PAINEL DE INPUTS SOMENTE LEITURA
   ------------------------------ */
const ReadOnlyInputsPanel = ({ inputs }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          📋 Premissas do Modelo
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8 text-sm">
        {[
          {
            title: "Macro & Geral",
            fields: [
              { label: "Inflação (IPCA)", key: "inflation", format: (v) => (v * 100).toFixed(1) + '%' },
              { label: "Taxa Impostos", key: "taxRate", format: (v) => (v * 100).toFixed(1) + '%' }
            ]
          },
          {
            title: "Operacional",
            fields: [
              { label: "Receita Inicial (Y1)", key: "initialRevenue", format: (v) => `R$ ${v.toLocaleString('pt-BR')}` },
              { label: "Margem CMV (%)", key: "cogsPercent", format: (v) => (v * 100).toFixed(1) + '%' },
              { label: "Despesas Op. (%)", key: "opexPercent", format: (v) => (v * 100).toFixed(1) + '%' }
            ]
          },
          {
            title: "Capital de Giro (Dias)",
            fields: [
              { label: "PMR (Recebimento)", key: "dso" },
              { label: "PME (Estoque)", key: "dio" },
              { label: "PMP (Fornecedores)", key: "dpo" }
            ]
          },
          {
            title: "Investimentos",
            fields: [
              { label: "Capex Inicial", key: "initialCapex", format: (v) => `R$ ${v.toLocaleString('pt-BR')}` },
              { label: "Capex Manutenção (%)", key: "maintenanceCapexRate", format: (v) => (v * 100).toFixed(1) + '%' },
              { label: "Anos Depreciação", key: "depreciationYears" }
            ]
          },
          {
            title: "Estrutura de Capital",
            fields: [
              { label: "Usar Dívida?", key: "useDebt", format: (v) => v ? 'Sim' : 'Não' },
              ...(inputs.useDebt ? [
                { label: "Valor Dívida", key: "debtAmount", format: (v) => `R$ ${v.toLocaleString('pt-BR')}` },
                { label: "Taxa Juros (a.a.)", key: "debtInterestRate", format: (v) => (v * 100).toFixed(1) + '%' },
                { label: "Prazo (anos)", key: "debtTerm" },
                { label: "Carência (anos)", key: "debtGrace" }
              ] : []),
              { label: "Reserva de Caixa", key: "cashReserve", format: (v) => `R$ ${v.toLocaleString('pt-BR')}` }
            ]
          },
          {
            title: "Valuation",
            fields: [
              { label: "WACC (%)", key: "wacc", format: (v) => (v * 100).toFixed(2) + '%' },
              { label: "Ke (Custo Equity)", key: "costOfEquity", format: (v) => (v * 100).toFixed(2) + '%' },
              { label: "Crescimento Perpetuidade", key: "perpetuityGrowth", format: (v) => (v * 100).toFixed(2) + '%' },
              { label: "Múltiplo Saída (EV/EBITDA)", key: "exitMultiple", format: (v) => v.toFixed(1) + 'x' }
            ]
          }
        ].map((section, i) => (
          <div key={i} className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-700 border-b pb-1">
              {section.title}
            </p>

            <div className="space-y-3">
              {section.fields.map((f, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg"
                >
                  <span className="text-gray-700">{f.label}</span>
                  <span className="font-semibold text-gray-900">
                    {f.format ? f.format(inputs[f.key]) : inputs[f.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};