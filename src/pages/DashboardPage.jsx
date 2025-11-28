import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { simulationService } from "../services/supabaseService";
import {
  TrendingUp,
  FileText,
  Calendar,
  Award,
  ArrowRightCircle,
} from "lucide-react";

export const DashboardPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      const data = await simulationService.getUserStats(user.id);
      setStats(data);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>

        <h1 className="text-4xl font-extrabold relative z-10">
          Bem-vindo, {profile?.full_name || "Usuário"} 
        </h1>
        <p className="mt-2 text-blue-100 text-lg relative z-10">
          Aqui estão os principais indicadores das suas modelagens financeiras
        </p>
      </div>

      {/* CARDS ESTATÍSTICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total */}
        <StatCard
          title="Total de Simulações"
          value={stats?.total || 0}
          icon={FileText}
          color="blue"
        />

        {/* Base */}
        <StatCard
          title="Cenário Base"
          value={stats?.byScenario.base || 0}
          icon={TrendingUp}
          color="green"
        />

        {/* Otimista */}
        <StatCard
          title="Otimista"
          value={stats?.byScenario.optimistic || 0}
          icon={Award}
          color="orange"
        />

        {/* Pessimista */}
        <StatCard
          title="Pessimista"
          value={stats?.byScenario.pessimistic || 0}
          icon={Calendar}
          color="red"
        />
      </div>

      {/* AÇÕES / PAINÉIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
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

        {/* Simulações recentes */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Últimas simulações
          </h2>

          {stats?.recent && stats.recent.length > 0 ? (
            <div className="space-y-4">
              {stats.recent.slice(0, 4).map((sim, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {sim.scenario}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(sim.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <ArrowRightCircle className="h-6 w-6 text-blue-600" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma simulação recente</p>
          )}
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
    green:
      "from-green-500/10 to-green-600/10 border-green-500 text-green-600",
    orange:
      "from-orange-500/10 to-orange-600/10 border-orange-500 text-orange-600",
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

