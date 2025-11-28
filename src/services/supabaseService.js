import { supabase } from '../config/supabase';

export const simulationService = {
  // Criar simulação
  async createSimulation(userId, simulation) {
    const { data, error } = await supabase
      .from('financial_simulations')
      .insert([{
        user_id: userId,
        name: simulation.name,
        scenario: simulation.scenario,
        inputs: simulation.inputs,
        summary: simulation.summary,
        projection: simulation.projection,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Listar simulações do usuário
  async getSimulations(userId) {
    const { data, error } = await supabase
      .from('financial_simulations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Obter uma simulação específica
  async getSimulation(simulationId) {
    const { data, error } = await supabase
      .from('financial_simulations')
      .select('*')
      .eq('id', simulationId)
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar simulação
  async updateSimulation(simulationId, updates) {
    const { data, error } = await supabase
      .from('financial_simulations')
      .update(updates)
      .eq('id', simulationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Deletar simulação
  async deleteSimulation(simulationId) {
    const { error } = await supabase
      .from('financial_simulations')
      .delete()
      .eq('id', simulationId);

    if (error) throw error;
  },

  // Estatísticas do usuário
  async getUserStats(userId) {
    const { data, error } = await supabase
      .from('financial_simulations')
      .select('scenario, created_at')
      .eq('user_id', userId);

    if (error) throw error;

    const stats = {
      total: data.length,
      byScenario: {
        base: data.filter(s => s.scenario === 'base').length,
        optimistic: data.filter(s => s.scenario === 'optimistic').length,
        pessimistic: data.filter(s => s.scenario === 'pessimistic').length,
      },
      recent: data.slice(0, 5)
    };

    return stats;
  }
};