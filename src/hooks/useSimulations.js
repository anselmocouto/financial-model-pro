import { useState, useEffect } from 'react';
import { simulationService } from '../services/supabaseService';
import { useAuth } from '../contexts/AuthContext';

export const useSimulations = () => {
  const { user } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadSimulations();
    }
  }, [user]);

  const loadSimulations = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await simulationService.getSimulations(user.id);
      setSimulations(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar simulações:', err);
    } finally {
      setLoading(false);
    }
  };

  const createSimulation = async (simulation) => {
    if (!user) throw new Error('Usuário não autenticado');
    
    setLoading(true);
    setError(null);
    
    try {
      const newSimulation = await simulationService.createSimulation(user.id, simulation);
      setSimulations(prev => [newSimulation, ...prev]);
      return newSimulation;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar simulação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSimulation = async (simulationId) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulationService.deleteSimulation(simulationId);
      setSimulations(prev => prev.filter(s => s.id !== simulationId));
    } catch (err) {
      setError(err.message);
      console.error('Erro ao deletar simulação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    simulations,
    loading,
    error,
    loadSimulations,
    createSimulation,
    deleteSimulation
  };
};