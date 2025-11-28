import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFinancialModel } from '../hooks/useFinancialModel';
import { useSimulations } from '../hooks/useSimulations';
import { Header } from '../components/layout/Header';
import { KPICards } from '../components/model/KPICards';
import { InputsPanel } from '../components/model/InputsPanel';
import { ChartsTab } from '../components/model/ChartsTab';
import { TablesTab } from '../components/model/TablesTab';
import { HistoryTab } from '../components/model/HistoryTab';

export const ModelPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('charts');
  const [projectName, setProjectName] = useState(''); // NOVO!

  const { inputs, setInputs, scenario, loadScenario, modelData } = useFinancialModel();
  const { simulations, loading, createSimulation, deleteSimulation } = useSimulations();

  const handleSaveSimulation = async () => {
    // VALIDAÇÃO DO NOME
    if (!projectName || projectName.trim().length < 3) {
      setMessage('❌ Digite um nome para o projeto (mínimo 3 caracteres)');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    try {
      const scenarioLabel = scenario.charAt(0).toUpperCase() + scenario.slice(1);
      const dateStr = new Date().toLocaleDateString('pt-BR');
      
      const simulation = {
        name: `${projectName.trim()} - ${scenarioLabel} - ${dateStr}`, // NOME MELHORADO!
        scenario: scenario,
        inputs: inputs,
        summary: {
          npvEquity: modelData.npvEquity,
          irrEquity: modelData.irrEquity,
          moic: modelData.moic,
        },
        projection: modelData.projection,
      };

      await createSimulation(simulation);
      setMessage(`✅ "${projectName}" salvo com sucesso no Supabase!`);
      
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage('❌ Erro ao gravar simulação: ' + error.message);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  // FUNÇÃO PARA SALVAR TODOS OS 3 CENÁRIOS DE UMA VEZ
  const handleSaveAllScenarios = async () => {
    if (!projectName || projectName.trim().length < 3) {
      setMessage('❌ Digite um nome para o projeto (mínimo 3 caracteres)');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    try {
      setMessage('⏳ Salvando todos os cenários...');
      const dateStr = new Date().toLocaleDateString('pt-BR');
      const scenarios = ['base', 'optimistic', 'pessimistic'];
      
      for (const scen of scenarios) {
        // Calcular modelo para cada cenário
        loadScenario(scen);
        
        // Aguardar um pouco para o cálculo processar
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const scenarioLabel = scen.charAt(0).toUpperCase() + scen.slice(1);
        const scenarioLabels = {
          base: 'Base',
          optimistic: 'Otimista',
          pessimistic: 'Pessimista'
        };
        
        const simulation = {
          name: `${projectName.trim()} - ${scenarioLabels[scen]} - ${dateStr}`,
          scenario: scen,
          inputs: inputs,
          summary: {
            npvEquity: modelData.npvEquity,
            irrEquity: modelData.irrEquity,
            moic: modelData.moic,
          },
          projection: modelData.projection,
        };

        await createSimulation(simulation);
      }

      setMessage(`✅ "${projectName}" - Todos os 3 cenários salvos com sucesso!`);
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('❌ Erro ao gravar cenários: ' + error.message);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const handleDeleteSimulation = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta simulação?')) {
      try {
        await deleteSimulation(id);
        setMessage('✅ Simulação excluída com sucesso!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('❌ Erro ao excluir simulação');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        scenario={scenario}
        onScenarioChange={loadScenario}
        message={message}
      />

      {/* CAMPO NOME DO PROJETO - NOVO! */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          📝 Nome do Projeto *
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-400 font-semibold"
          placeholder="Ex: Expansão Filial SP, Projeto App Mobile, Investimento Imóvel..."
          maxLength={100}
        />
        <p className="mt-2 text-xs text-gray-500">
          Este nome será usado para identificar suas simulações. Escolha algo descritivo para facilitar a busca depois.
        </p>
        {projectName && (
          <p className="mt-2 text-sm text-blue-600 font-semibold">
            📌 Será salvo como: "{projectName} - {scenario.charAt(0).toUpperCase() + scenario.slice(1)} - {new Date().toLocaleDateString('pt-BR')}"
          </p>
        )}
      </div>

      {/* KPI Cards */}
      <KPICards modelData={modelData} inputs={inputs} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Inputs Panel - Sidebar */}
        <div className="lg:col-span-1">
          <InputsPanel
            inputs={inputs}
            setInputs={setInputs}
            onSave={handleSaveSimulation}
            onSaveAll={handleSaveAllScenarios} // NOVO!
            loading={loading}
            projectName={projectName} // NOVO!
          />
        </div>

        {/* Charts/Tables/History - Main Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-gray-300">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('charts')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'charts'
                      ? 'bg-white text-blue-600 border-b-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📊 Gráficos
                </button>
                <button
                  onClick={() => setActiveTab('tables')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'tables'
                      ? 'bg-white text-blue-600 border-b-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📋 Demonstrativos
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === 'history'
                      ? 'bg-white text-blue-600 border-b-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  💾 Histórico ({simulations.length})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'charts' && <ChartsTab projection={modelData.projection} />}
              {activeTab === 'tables' && (
                <TablesTab projection={modelData.projection} inputs={inputs} />
              )}
              {activeTab === 'history' && (
                <HistoryTab
                  simulations={simulations}
                  onDelete={handleDeleteSimulation}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};