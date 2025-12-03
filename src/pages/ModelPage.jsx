import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useFinancialModel } from '../hooks/useFinancialModel';
import { useSimulations } from '../hooks/useSimulations';

import { Header } from '../components/layout/Header';
import { KPICards } from '../components/model/KPICards';
import { IndicatorAnalysis } from '../components/model/IndicatorAnalysis';
import { InputsPanel } from '../components/model/InputsPanel';
import { ChartsTab } from '../components/model/ChartsTab';
import { TablesTab } from '../components/model/TablesTab';
import { CompareScenariosTab } from '../components/model/CompareScenariosTab';
import { SectorSelector } from '../components/model/SectorSelector';
import { RevenueGrowthEditor } from '../components/model/RevenueGrowthEditor';

import { BarChart3, Table2, GitCompare } from "lucide-react";

export const ModelPage = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  // HOOK PRINCIPAL DO MODELO FINANCEIRO
  const {
    inputs,
    setInputs,
    scenario,
    loadScenario,
    modelData
  } = useFinancialModel();

  const { simulations, loading, createSimulation, deleteSimulation } = useSimulations();

  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('charts');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [projectName, setProjectName] = useState('');

  const [scenariosData, setScenariosData] = useState({
    base: null,
    optimistic: null,
    pessimistic: null
  });

  // ⭐ APLICAÇÃO DO TEMPLATE DE SETOR (Hospital, SaaS, Varejo etc.)
  const handleApplySectorTemplate = (template) => {
    setInputs(prev => ({
      ...prev,
      ...template
    }));
  };

  // 2. FUNÇÃO DE CALLBACK (adicionar no ModelPage)
const handleRevenueGrowthChange = (newGrowthStats) => {
  setInputs(prev => ({
    ...prev,
    revenueGrowthStats: newGrowthStats
  }));
};

  // Atualiza dados quando troca cenário
  useEffect(() => {
    if (!modelData) return;

    setScenariosData(prev => ({
      ...prev,
      [scenario]: {
        npvEquity: modelData.npvEquity,
        irrEquity: modelData.irrEquity,
        moic: modelData.moic,
        projection: modelData.projection
      }
    }));
  }, [scenario, modelData]);


  // 💾 Salvar o cenário atual
  const handleSaveSimulation = async () => {
    if (!projectName || projectName.trim().length < 3) {
      setMessage('Digite um nome para o projeto (mínimo 3 caracteres)');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    try {
      const label = scenario.charAt(0).toUpperCase() + scenario.slice(1);
      const dateStr = new Date().toLocaleDateString('pt-BR');

      const simulation = {
        name: `${projectName.trim()} - ${label} - ${dateStr}`,
        scenario,
        inputs,
        summary: {
          npvEquity: modelData.npvEquity,
          irrEquity: modelData.irrEquity,
          moic: modelData.moic,
          npvProject: modelData.npvProject,
          irrProject: modelData.irrProject,
        },
        projection: modelData.projection,
      };

      await createSimulation(simulation);

      setMessage(`"${projectName}" salvo com sucesso!`);
      setTimeout(() => setMessage(''), 4000);

    } catch (error) {
      setMessage("Erro ao salvar: " + error.message);
      setTimeout(() => setMessage(''), 4000);
    }
  };


  // 💾 Salvar todos os cenários automaticamente
  const handleSaveAllScenarios = async () => {
    if (!projectName || projectName.trim().length < 3) {
      setMessage("Digite um nome para o projeto.");
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      setMessage("Salvando todos os cenários...");

      const labels = {
        base: "Base",
        optimistic: "Otimista",
        pessimistic: "Pessimista"
      };

      for (const scen of Object.keys(labels)) {
        loadScenario(scen);
        await new Promise(r => setTimeout(r, 120));

        const dateStr = new Date().toLocaleDateString('pt-BR');

        const simulation = {
          name: `${projectName.trim()} - ${labels[scen]} - ${dateStr}`,
          scenario: scen,
          inputs,
          summary: {
            npvEquity: modelData.npvEquity,
            irrEquity: modelData.irrEquity,
            moic: modelData.moic,
            npvProject: modelData.npvProject,
            irrProject: modelData.irrProject,
          },
          projection: modelData.projection,
        };

        await createSimulation(simulation);
      }

      setMessage("Todos os cenários foram salvos!");
      setTimeout(() => setMessage(''), 4000);

    } catch (error) {
      setMessage("Erro ao salvar cenários.");
      setTimeout(() => setMessage(''), 3000);
    }
  };


  // 🗑 Excluir simulação
  const handleDeleteSimulation = async (id) => {
    if (!window.confirm("Excluir esta simulação?")) return;

    try {
      await deleteSimulation(id);
      setMessage("Simulação excluída.");
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage("Erro ao excluir.");
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // ---------------------------------------------------------------------
  // RENDERIZAÇÃO DA PÁGINA
  // ---------------------------------------------------------------------
  return (
    <div className="space-y-8 pb-10">
    
      <Header 
        scenario={scenario} 
        onScenarioChange={loadScenario} 
        message={message}
        showBackButton={true}
      />

      {/* Nome do projeto */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nome do Projeto *
        </label>

        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Ex: Expansão Unidade SP"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
        />

        {projectName && (
          <p className="mt-3 text-blue-600 text-sm font-semibold">
            📌 Será salvo como: "{projectName} - {scenario.toUpperCase()} - {new Date().toLocaleDateString('pt-BR')}"
          </p>
        )}
      </div>

      {/* ⭐ Seletor de Setor */}
      <SectorSelector 
        currentScenario={scenario}
        onApplyTemplate={handleApplySectorTemplate}
        inputs={inputs}
      />

      {/* NOVO: EDITOR DE CRESCIMENTO ANO A ANO */}
       <RevenueGrowthEditor 
        revenueGrowthStats={inputs.revenueGrowthStats}
        onChange={handleRevenueGrowthChange}
       />


      {/* KPI */}
      <KPICards modelData={modelData} inputs={inputs} />

      {/* ⭐ Botão mostrar/ocultar análise */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="
            group relative px-8 py-4 rounded-2xl font-bold text-lg shadow-xl
            transition-all duration-300 transform hover:scale-105
            bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
            text-white
          "
        >
          {showAnalysis ? 'Ocultar Análise' : 'Ver Análise dos Indicadores'}
        </button>
      </div>

      {showAnalysis && (
        <div className="animate-fadeIn">
          <IndicatorAnalysis modelData={modelData} inputs={inputs} />
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Inputs */}
        <div className="lg:col-span-1">
          <InputsPanel
            inputs={inputs}
            setInputs={setInputs}
            onSave={handleSaveSimulation}
            onSaveAll={handleSaveAllScenarios}
            loading={loading}
            projectName={projectName}
          />
        </div>

        {/* Tabs */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md border overflow-hidden">

            <div className="flex bg-slate-100 border-b">
              <button
                onClick={() => setActiveTab("charts")}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold ${
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
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold ${
                  activeTab === "tables"
                    ? "bg-white border-b-4 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Table2 className="w-5 h-5" />
                Demonstrativos
              </button>

              <button
                onClick={() => setActiveTab("compare")}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold ${
                  activeTab === "compare"
                    ? "bg-white border-b-4 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <GitCompare className="w-5 h-5" />
                Comparar
              </button>
            </div>

            <div className="p-6">
              {activeTab === "charts" && <ChartsTab projection={modelData.projection} />}
              {activeTab === "tables" && <TablesTab projection={modelData.projection} inputs={inputs} />}
              {activeTab === "compare" && scenariosData.base && scenariosData.optimistic && scenariosData.pessimistic ? (
                <CompareScenariosTab
                  baseData={scenariosData.base}
                  optimisticData={scenariosData.optimistic}
                  pessimisticData={scenariosData.pessimistic}
                />
              ) : activeTab === "compare" ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg font-semibold mb-2">⚠️ Calcule todos os cenários primeiro</p>
                  <p className="text-sm">Clique em Base → Otimista → Pessimista para gerar os dados.</p>
                </div>
              ) : null}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
