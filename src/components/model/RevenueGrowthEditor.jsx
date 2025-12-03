import React, { useState } from 'react';
import { TrendingUp, Edit3, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export const RevenueGrowthEditor = ({ revenueGrowthStats, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Começa fechado
  const [isEditing, setIsEditing] = useState(false);
  const [tempValues, setTempValues] = useState([...revenueGrowthStats]);

  const handleEdit = () => {
    setTempValues([...revenueGrowthStats]);
    setIsEditing(true);
  };

  const handleSave = () => {
    onChange(tempValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValues([...revenueGrowthStats]);
    setIsEditing(false);
  };

  const handleYearChange = (index, value) => {
    const numValue = parseFloat(value) / 100; // Converte % para decimal
    if (!isNaN(numValue)) {
      const newValues = [...tempValues];
      newValues[index] = numValue;
      setTempValues(newValues);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-md overflow-hidden">
      
      {/* Header - Sempre Visível (Clicável) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-100/50 transition"
      >
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">
              Crescimento de Receita por Ano
            </h3>
            <p className="text-sm text-gray-600">
              {isExpanded 
                ? "Clique para ocultar os detalhes" 
                : `Média: ${(revenueGrowthStats.reduce((a, b) => a + b, 0) / revenueGrowthStats.length * 100).toFixed(1)}% | Ano 1: ${(revenueGrowthStats[0] * 100).toFixed(1)}% → Ano 10: ${(revenueGrowthStats[9] * 100).toFixed(1)}%`
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Ícone de expandir/colapsar */}
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-green-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-green-600" />
          )}
        </div>
      </button>

      {/* Conteúdo Expansível */}
      {isExpanded && (
        <div className="px-6 pb-6 animate-fadeIn">
          
          {/* Botão Editar/Salvar/Cancelar */}
          <div className="flex justify-end mb-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <Check className="w-4 h-4" />
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-semibold"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <p className="text-sm text-gray-600 mb-4">
            {isEditing 
              ? "✏️ Ajuste o percentual de crescimento para cada ano da projeção:"
              : "📊 Taxas de crescimento aplicadas automaticamente. Clique em 'Editar' para customizar."}
          </p>

          {/* Grid de Anos */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(isEditing ? tempValues : revenueGrowthStats).map((growth, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl p-4 border-2 ${
                  isEditing ? 'border-green-400' : 'border-green-200'
                }`}
              >
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Ano {index + 1}
                </label>
                
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={(tempValues[index] * 100).toFixed(1)}
                    onChange={(e) => handleYearChange(index, e.target.value)}
                    className="w-full px-2 py-2 text-center text-lg font-bold text-green-600 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <div className="text-center text-2xl font-bold text-green-600">
                    {(growth * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          {!isEditing && (
            <div className="mt-4 bg-white/70 rounded-xl p-4 border border-green-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Média Total</p>
                  <p className="text-lg font-bold text-green-600">
                    {(revenueGrowthStats.reduce((a, b) => a + b, 0) / revenueGrowthStats.length * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Inicial (Ano 1)</p>
                  <p className="text-lg font-bold text-green-600">
                    {(revenueGrowthStats[0] * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Final (Ano 10)</p>
                  <p className="text-lg font-bold text-green-600">
                    {(revenueGrowthStats[9] * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warning quando editando */}
          {isEditing && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                ⚠️ <strong>Atenção:</strong> Alterações só serão aplicadas após clicar em "Salvar". 
                Os cálculos serão atualizados automaticamente.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};