import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Função segura para valores numéricos
const safeNumber = (v) => {
  if (v === undefined || v === null || isNaN(v)) return 0;
  return Number(v);
};

// Função segura para o formato de MOIC
const safeMoic = (v) => {
  if (v === undefined || v === null || isNaN(v)) return '-';
  return `${Number(v).toFixed(2)}x`;
};

export const CompareScenariosTab = ({ baseData, optimisticData, pessimisticData }) => {
  // Proteção caso algum projection esteja vazio
  const baseProj = baseData?.projection ?? [];
  const optProj = optimisticData?.projection ?? [];
  const pesProj = pessimisticData?.projection ?? [];

  // Preparar dados para comparação
  const compareData = baseProj.map((row, index) => ({
    year: row.year,
    base_revenue: safeNumber(row.revenue),
    base_ebitda: safeNumber(row.ebitda),
    base_netIncome: safeNumber(row.netIncome),
    base_cash: safeNumber(row.bs_cash),

    optimistic_revenue: safeNumber(optProj[index]?.revenue),
    optimistic_ebitda: safeNumber(optProj[index]?.ebitda),
    optimistic_netIncome: safeNumber(optProj[index]?.netIncome),
    optimistic_cash: safeNumber(optProj[index]?.bs_cash),

    pessimistic_revenue: safeNumber(pesProj[index]?.revenue),
    pessimistic_ebitda: safeNumber(pesProj[index]?.ebitda),
    pessimistic_netIncome: safeNumber(pesProj[index]?.netIncome),
    pessimistic_cash: safeNumber(pesProj[index]?.bs_cash),
  }));

  // KPIs comparativos
  const kpis = [
    {
      label: 'VPL Acionista',
      base: safeNumber(baseData.npvEquity),
      optimistic: safeNumber(optimisticData.npvEquity),
      pessimistic: safeNumber(pessimisticData.npvEquity),
      format: formatCurrency,
    },
    {
      label: 'TIR Acionista',
      base: safeNumber(baseData.irrEquity),
      optimistic: safeNumber(optimisticData.irrEquity),
      pessimistic: safeNumber(pessimisticData.irrEquity),
      format: formatPercent,
    },
    {
      label: 'MOIC',
      base: safeNumber(baseData.moic),
      optimistic: safeNumber(optimisticData.moic),
      pessimistic: safeNumber(pessimisticData.moic),
      format: safeMoic,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-8">

      {/* KPIs Comparativos */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Comparação de KPIs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Métrica</th>
                <th className="p-3 text-right bg-blue-50">Base</th>
                <th className="p-3 text-right bg-green-50">Otimista</th>
                <th className="p-3 text-right bg-red-50">Pessimista</th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-semibold">{kpi.label}</td>
                  <td className="p-3 text-right font-bold text-blue-700 bg-blue-50">
                    {kpi.format(kpi.base)}
                  </td>
                  <td className="p-3 text-right font-bold text-green-700 bg-green-50">
                    {kpi.format(kpi.optimistic)}
                  </td>
                  <td className="p-3 text-right font-bold text-red-700 bg-red-50">
                    {kpi.format(kpi.pessimistic)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico: Receita Comparada */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Evolução da Receita</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={compareData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} />
            <Tooltip formatter={(val) => formatCurrency(val)} />
            <Legend />
            <Line type="monotone" dataKey="base_revenue" stroke="#3b82f6" name="Base" strokeWidth={3} />
            <Line type="monotone" dataKey="optimistic_revenue" stroke="#10b981" name="Otimista" strokeWidth={3} />
            <Line type="monotone" dataKey="pessimistic_revenue" stroke="#ef4444" name="Pessimista" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico: EBITDA Comparado */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">💰 Evolução do EBITDA</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={compareData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} />
            <Tooltip formatter={(val) => formatCurrency(val)} />
            <Legend />
            <Line type="monotone" dataKey="base_ebitda" stroke="#3b82f6" name="Base" strokeWidth={3} />
            <Line type="monotone" dataKey="optimistic_ebitda" stroke="#10b981" name="Otimista" strokeWidth={3} />
            <Line type="monotone" dataKey="pessimistic_ebitda" stroke="#ef4444" name="Pessimista" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico: Caixa Comparado */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">🏦 Caixa Acumulado</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={compareData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} />
            <Tooltip formatter={(val) => formatCurrency(val)} />
            <Legend />
            <Bar dataKey="base_cash" fill="#3b82f6" name="Base" />
            <Bar dataKey="optimistic_cash" fill="#10b981" name="Otimista" />
            <Bar dataKey="pessimistic_cash" fill="#ef4444" name="Pessimista" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
