import React from "react";
import { Save, Layers } from "lucide-react";

export const InputsPanel = ({ inputs, setInputs, onSave, onSaveAll, loading, projectName }) => {
  const updateInput = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          ⚙️ Premissas do Modelo
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8 text-sm">
        {/* Section Component */}
        {[
          {
            title: "Macro & Geral",
            fields: [
              { label: "Inflação (IPCA)", key: "inflation", step: "0.001" },
              { label: "Taxa Impostos", key: "taxRate", step: "0.01" }
            ]
          },

          {
            title: "Operacional",
            fields: [
              { label: "Receita Inicial (Y1)", key: "initialRevenue" },
              { label: "Margem CMV (%)", key: "cogsPercent", step: "0.01" },
              { label: "Despesas Op. (%)", key: "opexPercent", step: "0.01" }
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
              { label: "Capex Inicial", key: "initialCapex" },
              {
                label: "Capex Manutenção (%)",
                key: "maintenanceCapexRate",
                step: "0.01"
              },
              { label: "Anos Depreciação", key: "depreciationYears" }
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
                  <input
                    type="number"
                    step={f.step ?? "1"}
                    className="w-28 md:w-32 border border-gray-300 rounded-lg px-3 py-2 text-right bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                    value={inputs[f.key]}
                    onChange={(e) =>
                      updateInput(f.key, Number(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Estrutura de Capital */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-700 border-b pb-1">
            Estrutura de Capital
          </p>

          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="font-medium text-gray-700">Usar Dívida?</span>
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={inputs.useDebt}
              onChange={(e) => updateInput("useDebt", e.target.checked)}
            />
          </div>

          {inputs.useDebt && (
            <div className="grid grid-cols-1 gap-3 bg-blue-50 border border-blue-200 p-4 rounded-xl">
              {[
                { label: "Valor Dívida", key: "debtAmount" },
                { label: "Taxa Juros (a.a.)", key: "debtInterestRate", step: "0.01" },
                { label: "Prazo (anos)", key: "debtTerm" },
                { label: "Carência (anos)", key: "debtGrace" }
              ].map((f, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between bg-white border border-blue-200 p-3 rounded-lg"
                >
                  <span className="text-gray-800 text-sm">{f.label}</span>
                  <input
                    type="number"
                    step={f.step ?? "1"}
                    className="w-24 text-right px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    value={inputs[f.key]}
                    onChange={(e) =>
                      updateInput(f.key, Number(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg">
            <span className="text-gray-700">Reserva de Caixa</span>
            <input
              type="number"
              className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-right shadow-sm"
              value={inputs.cashReserve}
              onChange={(e) => updateInput("cashReserve", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Valuation */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-700 border-b pb-1">
            Valuation
          </p>

          <div className="space-y-3">
            {[
              { label: "WACC (%)", key: "wacc", step: "0.01" },
              { label: "Ke (Custo Equity)", key: "costOfEquity", step: "0.01" },
              { label: "Crescimento Perpetuidade", key: "perpetuityGrowth", step: "0.001" },
              { label: "Múltiplo Saída (EV/EBITDA)", key: "exitMultiple", step: "0.1" }
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg"
              >
                <span className="text-gray-700">{f.label}</span>
                <input
                  type="number"
                  step={f.step}
                  className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-right shadow-sm focus:ring-2 focus:ring-blue-400"
                  value={inputs[f.key]}
                  onChange={(e) =>
                    updateInput(f.key, Number(e.target.value))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* BOTÕES DE SALVAR */}
        <div className="space-y-3 pt-4 border-t-2 border-gray-200">
          {/* Botão: Gravar Este Cenário */}
          <button
            onClick={onSave}
            disabled={loading || !projectName}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={20} />
            {loading ? "Gravando..." : "Gravar Este Cenário"}
          </button>

          {/* Botão: Gravar TODOS os Cenários */}
          <button
            onClick={onSaveAll}
            disabled={loading || !projectName}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Layers size={20} />
            {loading ? "Gravando..." : "Gravar TODOS os Cenários"}
          </button>

          {/* Aviso se não tiver nome */}
          {!projectName && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <p className="text-xs text-yellow-800 font-semibold flex items-center gap-2">
                ⚠️ Digite o nome do projeto no topo da página para habilitar os botões
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};