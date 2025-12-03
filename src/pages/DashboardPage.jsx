import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { simulationService } from "../services/supabaseService";
import { UserCard } from "../components/layout/UserCard";
import { HistoryTab } from "../components/model/HistoryTab";
import {
  TrendingUp,
  FileText,
  Calendar,
  Award,
  Search,
} from "lucide-react";

export const DashboardPage = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Carrega estatísticas
      const statsData = await simulationService.getUserStats(user.id);
      setStats(statsData);

      // Carrega todas as simulações
      const sims = await simulationService.getSimulations(user.id);
      setSimulations(sims || []);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSimulation = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta simulação?")) return;

    try {
      await simulationService.deleteSimulation(id);
      // Recarrega as simulações após deletar
      const sims = await simulationService.getSimulations(user.id);
      setSimulations(sims || []);
      
      // Atualiza as estatísticas também
      const statsData = await simulationService.getUserStats(user.id);
      setStats(statsData);
    } catch (error) {
      console.error("Erro ao excluir simulação:", error);
      alert("Erro ao excluir simulação");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // FILTRAR SIMULAÇÕES
  const filteredSimulations = simulations.filter((sim) =>
    sim.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 space-y-10 bg-gray-50">
      
      {/* HEADER / BANNER */}
      <UserCard 
        profile={profile}
        user={user}
        handleLogout={handleLogout}
      />

      {/* CARDS ESTATÍSTICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Simulações"
          value={stats?.total || 0}
          icon={FileText}
          color="blue"
        />

        <StatCard
          title="Cenário Base"
          value={stats?.byScenario?.base || 0}
          icon={TrendingUp}
          color="green"
        />

        <StatCard
          title="Otimista"
          value={stats?.byScenario?.optimistic || 0}
          icon={Award}
          color="orange"
        />

        <StatCard
          title="Pessimista"
          value={stats?.byScenario?.pessimistic || 0}
          icon={Calendar}
          color="red"
        />
      </div>

      {/* AÇÕES / PAINÉIS */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Criar nova modelagem */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Começar nova modelagem
          </h2>
          <p className="text-gray-600 mb-6">
            Crie simulações completas com DRE, Fluxo de Caixa, Cenários e
            Valuation.
          </p>

          <button
            onClick={() => navigate("/model")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl shadow-lg font-semibold text-lg transition-all transform hover:scale-[1.01]"
          >
            Criar Modelagem
          </button>
        </div>

        {/* SEÇÃO DE HISTÓRICO */}
        <div>
          {/* Título e Busca */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Histórico de Simulações
            </h2>

            {/* BARRA DE BUSCA */}
            <div className="relative md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-medium shadow-sm"
              />
            </div>
          </div>

          {/* CONTADOR DE RESULTADOS */}
          {simulations.length > 0 && (
            <div className="mb-4 text-sm text-gray-600 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              {searchTerm ? (
                <p>
                  🔍 Mostrando <strong className="text-blue-600">{filteredSimulations.length}</strong> de <strong>{simulations.length}</strong> simulações
                </p>
              ) : (
                <p>
                  📊 Total: <strong className="text-blue-600">{simulations.length}</strong> simulações salvas
                </p>
              )}
            </div>
          )}
          
          {/* HISTÓRICO */}
          <HistoryTabWithNavigation 
            simulations={filteredSimulations}
            onDelete={handleDeleteSimulation}
            loading={loading}
            navigate={navigate}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

/* ------------------------------
   COMPONENTE: CARD DE ESTATÍSTICA
   ------------------------------ */
const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorMap = {
    blue: "from-blue-500/10 to-blue-600/10 border-blue-500 text-blue-600",
    green: "from-green-500/10 to-green-600/10 border-green-500 text-green-600",
    orange: "from-orange-500/10 to-orange-600/10 border-orange-500 text-orange-600",
    red: "from-red-500/10 to-red-600/10 border-red-500 text-red-600",
  };

  return (
    <div
      className={`bg-white p-6 rounded-3xl shadow-xl border-l-4 ${colorMap[color]} transition transform hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm uppercase font-bold">{title}</p>
          <p className="text-4xl font-extrabold text-gray-900 mt-1">
            {value}
          </p>
        </div>
        <Icon className={`h-14 w-14 ${colorMap[color].split(" ").pop()}`} />
      </div>
    </div>
  );
};

/* ------------------------------
   WRAPPER: HistoryTab com navegação
   ------------------------------ */
const HistoryTabWithNavigation = ({ simulations, onDelete, loading, navigate, searchTerm }) => {
  const handleCardClick = (simulation) => {
    navigate(`/model/view/${simulation.id}`);
  };

  return (
    <HistoryTab 
      simulations={simulations}
      onDelete={onDelete}
      loading={loading}
      onCardClick={handleCardClick}
      searchTerm={searchTerm}
    />
  );
};