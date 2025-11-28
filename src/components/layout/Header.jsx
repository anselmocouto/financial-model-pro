import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const Header = ({ scenario, onScenarioChange, message }) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const scenarioBtn = (value, label, activeColor) => (
    <button
      onClick={() => onScenarioChange(value)}
      className={`
        px-4 py-2 rounded-xl font-semibold transition shadow-sm
        border border-white/20 backdrop-blur-sm
        ${scenario === value
          ? `bg-white text-${activeColor}-600 shadow-md`
          : `bg-white/10 text-white hover:bg-white/20`
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 rounded-3xl shadow-2xl text-white mb-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6">

        {/* LEFT SECTION */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold drop-shadow-sm">
            Modelagem Financeira PRO
          </h1>

          <p className="text-blue-100 mt-1 text-sm tracking-wide">
            DRE • Balanço • Fluxo de Caixa • Valuation
          </p>

          {message && (
            <div className="mt-4 bg-white/20 px-4 py-2 rounded-xl text-sm shadow-sm inline-block">
              {message}
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col items-start lg:items-end gap-4">

          {/* USER CARD */}
          <div className="
            flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl
            shadow-md border border-white/20 backdrop-blur
          ">
            <div className="flex items-center gap-2">
              <User size={22} className="opacity-80" />
              <div className="text-left leading-tight">
                <p className="text-sm font-semibold">
                  {profile?.full_name || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-blue-100">{user?.email}</p>
              </div>          
            </div>
          

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/20 rounded-xl transition"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
            
            {/* SCENARIOS */}
            <div className="flex gap-3">
            {scenarioBtn('base', 'Base', 'blue')}
            {scenarioBtn('optimistic', 'Otimista', 'green')}
            {scenarioBtn('pessimistic', 'Pessimista', 'red')}
            </div>
        </div>
      </div>
    </header>
  );
};
