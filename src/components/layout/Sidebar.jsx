import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, HelpCircle } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/model', icon: FileText, label: 'Nova Modelagem' },
    { path: '/settings', icon: Settings, label: 'Configurações' },
    { path: '/help', icon: HelpCircle, label: 'Ajuda' },
  ];

  return (
    <div
      className="
        w-64 rounded-2xl p-4 h-fit sticky top-6
        bg-white/30 backdrop-blur-xl
        border border-white/40 shadow-xl
      "
    >
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-white/40 hover:shadow-md'
                }
              `}
            >
              <Icon
                size={20}
                className={`
                  transition-transform duration-200
                  ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                `}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
