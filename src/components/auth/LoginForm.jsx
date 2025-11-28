// Versão refinada e mais profissional do seu LoginForm
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          {/* Logo */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4"
            >
              <TrendingUp className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Financial Model Pro
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* Erro */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg"
            >
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botão entrar */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </motion.button>
          </form>

          {/* Cadastro */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            © 2025 Financial Model Pro
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Light effects */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>

        <div className="absolute top-14 right-20 w-72 h-72 bg-indigo-400 rounded-full filter blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-16 left-20 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl mix-blend-multiply"></div>

        <div className="relative z-10 flex flex-col justify-center px-20">
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold leading-tight drop-shadow-lg"
          >
            Modelagem Financeira Profissional
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mt-6 mb-12 text-blue-100 leading-relaxed max-w-lg"
          >
            Crie projeções completas com DRE, Fluxo de Caixa e Valuation em
            poucos minutos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 gap-6 max-w-md"
          >
            {[
              { icon: BarChart3, title: "Valuation", desc: "VPL, TIR, MOIC" },
              {
                icon: PieChart,
                title: "Cenários",
                desc: "Base, otimista e pessimista",
              },
              {
                icon: TrendingUp,
                title: "Gráficos",
                desc: "Visualizações interativas",
              },
              {
                icon: DollarSign,
                title: "Completo",
                desc: "DRE + BP + FCF integrados",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-sm hover:bg-white/20 transition"
              >
                <f.icon className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg">{f.title}</h3>
                <p className="text-blue-100 text-sm">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
