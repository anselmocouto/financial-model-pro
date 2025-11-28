import { useState, useMemo } from 'react';
import { calculateFinancialModel } from '../utils/calculations';

const DEFAULT_INPUTS = {
  inflation: 0.045,
  taxRate: 0.34,
  initialRevenue: 10000000,
  revenueGrowthStats: [0.15, 0.12, 0.10, 0.08, 0.06, 0.05, 0.045, 0.045, 0.045, 0.045],
  cogsPercent: 0.40,
  opexPercent: 0.25,
  dso: 45,
  dio: 30,
  dpo: 40,
  initialCapex: 2000000,
  maintenanceCapexRate: 0.03,
  depreciationYears: 10,
  useDebt: true,
  debtAmount: 1500000,
  debtInterestRate: 0.12,
  debtTerm: 5,
  debtGrace: 1,
  cashReserve: 500000,
  wacc: 0.13,
  costOfEquity: 0.16,
  perpetuityGrowth: 0.035,
  exitMultiple: 7
};

export const useFinancialModel = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [scenario, setScenario] = useState('base');

  const modelData = useMemo(() => {
    return calculateFinancialModel(inputs);
  }, [inputs]);

  const loadScenario = (type) => {
    setScenario(type);
    
    if (type === 'base') {
      setInputs(prev => ({ 
        ...prev, 
        revenueGrowthStats: [0.15, 0.12, 0.10, 0.08, 0.06, 0.05, 0.045, 0.045, 0.045, 0.045], 
        cogsPercent: 0.40 
      }));
    } else if (type === 'optimistic') {
      setInputs(prev => ({ 
        ...prev, 
        revenueGrowthStats: [0.25, 0.20, 0.15, 0.10, 0.08, 0.06, 0.05, 0.05, 0.05, 0.05], 
        cogsPercent: 0.35 
      }));
    } else if (type === 'pessimistic') {
      setInputs(prev => ({ 
        ...prev, 
        revenueGrowthStats: [0.05, 0.04, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02], 
        cogsPercent: 0.48 
      }));
    }
  };

  const resetInputs = () => {
    setInputs(DEFAULT_INPUTS);
    setScenario('base');
  };

  return {
    inputs,
    setInputs,
    scenario,
    loadScenario,
    resetInputs,
    modelData
  };
};