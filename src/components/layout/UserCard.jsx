import React from 'react';
import { User, LogOut } from "lucide-react";

export const UserCard = ({ profile, user, handleLogout }) => {
  return (
<div className="
  bg-gradient-to-r from-blue-600 to-purple-700 
  text-white rounded-3xl shadow-xl p-14
">
  <div className="flex justify-between items-start">

    {/* TEXTO à esquerda */}
    <div>
      <h1 className="text-4xl font-extrabold">
        Bem-vindo, {profile?.full_name}
      </h1>

      <p className="text-blue-100 mt-3 text-lg">
        Aqui estão os principais indicadores das suas modelagens financeiras
      </p>
    </div>

    {/* USERCARD à direita */}
    <div className="
      bg-white/10 px-5 py-4 rounded-2xl shadow-lg border border-white/20 
      backdrop-blur flex items-center gap-4 self-start
    ">
      <User size={22} className="opacity-80" />

      <div>
        <p className="text-sm font-semibold">{profile?.full_name}</p>
        <p className="text-xs text-blue-200">{user?.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="p-2 hover:bg-white/20 rounded-xl transition"
      >
        <LogOut size={18} />
      </button>
    </div>

  </div>
  </div>

  );
};
