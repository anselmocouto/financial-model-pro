import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { TrendingUp, TrendingDown, DollarSign, Percent, AlertCircle } from 'lucide-react';

export const KPICards = ({ modelData, inputs }) => {
  const kpis = [
    {
      label: 'VPL Projeto',
      value: modelData.npvProject,
      format: formatCurrency,
      icon: DollarSign,
      color: modelData.npvProject >= 0 ? 'green' : 'red',
      comparison: inputs.wacc,
    },
    {
      label: 'TIR Projeto',
      value: modelData.irrProject,
      format: formatPercent,
      icon: Percent,
      color: modelData.irrProject >= inputs.wacc ? 'blue' : 'red',
      comparison: inputs.wacc,
    },
    {
      label: 'VPL Acionista',
      value: modelData.npvEquity,
      format: formatCurrency,
      icon: DollarSign,
      color: modelData.npvEquity >= 0 ? 'purple' : 'red',
    },
    {
      label: 'MOIC',
      value: modelData.moic,
      format: (v) => `${v.toFixed(2)}x`,
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  const colorClasses = {
    green: 'from-green-50 to-emerald-100 border-green-200 text-green-600',
    blue: 'from-blue-50 to-cyan-100 border-blue-200 text-blue-600',
    purple: 'from-purple-50 to-pink-100 border-purple-200 text-purple-600',
    orange: 'from-orange-50 to-yellow-100 border-orange-200 text-orange-600',
    red: 'from-red-50 to-red-100 border-red-200 text-red-600',
    gray: 'from-gray-50 to-gray-100 border-gray-200 text-gray-500',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        
        // Verifica se o valor existe e é válido
        const hasValue = kpi.value !== null && kpi.value !== undefined && !isNaN(kpi.value);
        const isPositive = hasValue && kpi.value >= (kpi.comparison || 0);
        const displayColor = hasValue ? kpi.color : 'gray';

        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${colorClasses[displayColor]} border-2 rounded-xl shadow-lg p-6 transition hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                {kpi.label}
              </p>
              {hasValue ? (
                <Icon size={24} className={`text-${displayColor}-600`} />
              ) : (
                <AlertCircle size={24} className="text-gray-400" />
              )}
            </div>
            
            {hasValue ? (
              <>
                <p className={`text-3xl font-bold ${colorClasses[displayColor].split(' ')[2]}`}>
                  {kpi.format(kpi.value)}
                </p>
                {kpi.comparison !== undefined && (
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    {isPositive ? (
                      <TrendingUp size={14} className="text-green-600" />
                    ) : (
                      <TrendingDown size={14} className="text-red-600" />
                    )}
                    <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                      {isPositive ? 'Acima' : 'Abaixo'} do WACC ({formatPercent(kpi.comparison)})
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-2">
                <p className="text-2xl font-bold text-gray-400 mb-1">N/D</p>
                <p className="text-xs text-gray-500">Não disponível</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};