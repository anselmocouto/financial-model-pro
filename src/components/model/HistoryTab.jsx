import React from 'react';
import { formatCurrency, formatPercent, formatDate } from '../../utils/formatters';
import { exportToCSV } from '../../utils/calculations';
import { Download, Trash2, FileText } from 'lucide-react';

export const HistoryTab = ({ simulations, onDelete, loading }) => {

  // ==============================================
  // LOADING
  // ==============================================
  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center border border-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Carregando simulações...</p>
      </div>
    );
  }

  // ==============================================
  // EMPTY STATE
  // ==============================================
  if (simulations.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-16 rounded-2xl shadow-xl text-center border border-gray-100">
        <FileText className="mx-auto h-20 w-20 text-gray-300 mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-3">
          Nenhuma simulação salva
        </h3>
        <p className="text-gray-500 text-lg">
          Ajuste as premissas e clique em <strong>"Gravar Simulação"</strong> para começar.
        </p>
      </div>
    );
  }

  // ==============================================
  // SCENARIO STYLE MAP
  // ==============================================
  const scenarioTag = {
    base: "bg-blue-100 text-blue-700 border-blue-300",
    optimistic: "bg-green-100 text-green-700 border-green-300",
    pessimistic: "bg-red-100 text-red-700 border-red-300",
  };

  const scenarioLabel = {
    base: "Base",
    optimistic: "Otimista",
    pessimistic: "Pessimista",
  };

  // ==============================================
  // LIST
  // ==============================================
  return (
    <div className="space-y-6">
      {simulations.map((sim) => (
        <div
          key={sim.id}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all p-8"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-6">

            {/* LEFT CONTENT */}
            <div className="flex-1">

              {/* TITLE + TAG */}
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-2xl font-bold text-gray-900">{sim.name}</h4>

                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${scenarioTag[sim.scenario]}`}
                >
                  {scenarioLabel[sim.scenario]}
                </span>
              </div>

              {/* DATE */}
              <p className="text-sm text-gray-500 mb-6">
                Criado em: <span className="font-semibold">{formatDate(sim.timestamp)}</span>
              </p>

              {/* MINI CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              
              <div className="flex flex-wrap gap-4 mt-4">

            {/* VPL */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl 
                            border border-purple-200 shadow-sm min-w-[240px] flex-1">
              <p className="text-xs text-gray-600 font-semibold mb-1">VPL Acionista</p>
              <p className={`text-xl font-extrabold ${
                  sim.summary.npvEquity >= 0 ? "text-purple-700" : "text-red-600"
                }`}>
                {formatCurrency(sim.summary.npvEquity)}
              </p>
            </div>

            {/* TIR */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl 
                            border border-blue-200 shadow-sm min-w-[240px] flex-1">
              <p className="text-xs text-gray-600 font-semibold mb-1">TIR Acionista</p>
              <p className="text-xl font-extrabold text-blue-700">
                {formatPercent(sim.summary.irrEquity)}
              </p>
            </div>

            {/* MOIC */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-xl 
                            border border-orange-200 shadow-sm min-w-[240px] flex-1">
              <p className="text-xs text-gray-600 font-semibold mb-1">MOIC</p>
              <p className="text-xl font-extrabold text-orange-700">
                {sim.summary.moic.toFixed(2)}x
              </p>
            </div>

            {/* YEARS */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl 
                            border border-green-200 shadow-sm min-w-[240px] flex-1">
              <p className="text-xs text-gray-600 font-semibold mb-1">Anos Projetados</p>
              <p className="text-xl font-extrabold text-green-700">
                {sim.projection.length - 1} anos
              </p>
            </div>

            </div>
            </div>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex flex-col gap-3 lg:ml-4 lg:w-40">

              <button
                onClick={() => exportToCSV(sim)}
                className="flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                text-white px-4 py-3 rounded-xl text-sm font-bold
                transition shadow-md hover:shadow-xl"
              >
                <Download size={18} />
                Exportar CSV
              </button>

              <button
                onClick={() => onDelete(sim.id)}
                className="flex items-center justify-center gap-2
                bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                text-white px-4 py-3 rounded-xl text-sm font-bold
                transition shadow-md hover:shadow-xl"
              >
                <Trash2 size={18} />
                Excluir
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
