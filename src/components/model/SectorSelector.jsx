import React, { useState } from 'react';
import { SECTOR_OPTIONS, applySectorTemplate } from "../../constants/sectorTemplates.js";
import { Building2, Info, ChevronDown, ChevronUp } from 'lucide-react';

  export const SectorSelector = ({ currentScenario, onApplyTemplate, inputs }) => {
    const [selectedSector, setSelectedSector] = useState('custom');
    const [showInfo, setShowInfo] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // ⭐ Começa fechado
  
    const handleSectorChange = (sectorKey) => {
      setSelectedSector(sectorKey);
      
      // Aplica o template do setor no cenário atual
      const template = applySectorTemplate(sectorKey, currentScenario);
      if (template) {
        onApplyTemplate(template);
      }
    };
  
    const selectedOption = SECTOR_OPTIONS.find(opt => opt.value === selectedSector);
  
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 shadow-md overflow-hidden">
        
        {/* Header - Sempre Visível (Clicável) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-100/50 transition"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800">
                Template de Setor
              </h3>
              <p className="text-sm text-gray-600">
                {isExpanded 
                  ? "Clique para ocultar os detalhes" 
                  : `Setor: ${selectedOption?.label} | Crescimento Ano 1: ${(inputs.revenueGrowthStats?.[0] * 100).toFixed(1)}% | CMV: ${(inputs.cogsPercent * 100).toFixed(1)}%`
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Ícone de expandir/colapsar */}
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-purple-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-purple-600" />
            )}
          </div>
        </button>
  
        {/* Conteúdo Expansível */}
        {isExpanded && (
          <div className="px-6 pb-6 animate-fadeIn">
            
            {/* Botão Info */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 hover:bg-white/50 rounded-lg transition"
                title="Informações"
              >
                <Info className="w-5 h-5 text-purple-600" />
              </button>
            </div>
  
            {/* Info Box */}
            {showInfo && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Como funciona:</strong> Selecione o setor do seu projeto e o sistema aplicará 
                  automaticamente taxas de crescimento e margens típicas daquele setor. Você pode editar 
                  todos os valores manualmente depois!
                </p>
              </div>
            )}
  
            {/* Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Escolha o Setor do Projeto
              </label>
              
              <select
                value={selectedSector}
                onChange={(e) => handleSectorChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium bg-white"
              >
                {SECTOR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Description */}
            {selectedOption?.description && (
              <div className="bg-white/70 rounded-xl p-4 border border-purple-200 mb-4">
                <p className="text-sm text-gray-700">
                  📌 <strong>Características:</strong> {selectedOption.description}
                </p>
              </div>
            )}
  
            {/* Current Values Preview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 rounded-lg p-3 border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Crescimento Ano 1</p>
                <p className="text-lg font-bold text-purple-600">
                  {(inputs.revenueGrowthStats?.[0] * 100).toFixed(1)}%
                </p>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border border-purple-200">
                <p className="text-xs text-gray-600 mb-1">Margem CMV</p>
                <p className="text-lg font-bold text-purple-600">
                  {(inputs.cogsPercent * 100).toFixed(1)}%
                </p>
              </div>
            </div>
  
            {/* Warning */}
            {selectedSector !== 'custom' && (
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Atenção:</strong> Os valores foram aplicados automaticamente. 
                  Você pode ajustá-los manualmente no painel de premissas abaixo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
