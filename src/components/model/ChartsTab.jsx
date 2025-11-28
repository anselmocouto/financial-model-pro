import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

export const ChartsTab = ({ projection }) => {
  return (
    <div className="space-y-10">

      {/* CARD: Gráfico Principal */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Evolução Financeira
        </h3>

        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={projection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="year"
              tick={{ fontSize: 13, fill: "#6b7280" }}
              label={{
                value: "Ano",
                position: "insideBottom",
                offset: -5,
                fill: "#6b7280"
              }}
            />

            <YAxis
              tickFormatter={(v) => `R$ ${(v / 1_000_000).toFixed(1)}M`}
              tick={{ fontSize: 13, fill: "#6b7280" }}
              label={{
                value: "Valores (R$ Milhões)",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280",
                style: { textAnchor: "middle" }
              }}
            />

            <Tooltip
              formatter={(val) => formatCurrency(val)}
              contentStyle={{
                background: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "10px"
              }}
            />

            <Legend verticalAlign="top" height={36} />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Receita"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5, fill: "#2563eb" }}
            />

            <Line
              type="monotone"
              dataKey="ebitda"
              name="EBITDA"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 5, fill: "#059669" }}
            />

            <Line
              type="monotone"
              dataKey="netIncome"
              name="Lucro Líquido"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ r: 5, fill: "#7c3aed" }}
            />

            <Line
              type="monotone"
              dataKey="bs_cash"
              name="Caixa Acumulado"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CARD: Gráfico de Barras */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Fluxo de Caixa
        </h3>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={projection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="year"
              tick={{ fontSize: 13, fill: "#6b7280" }}
            />

            <YAxis
              tickFormatter={(v) => `R$ ${(v / 1_000_000).toFixed(1)}M`}
              tick={{ fontSize: 13, fill: "#6b7280" }}
            />

            <Tooltip
              formatter={(val) => formatCurrency(val)}
              contentStyle={{
                background: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "10px"
              }}
            />

            <Legend verticalAlign="top" height={36} />

            <Bar
              dataKey="fcff"
              name="FCFF (Firma)"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="fcfe"
              name="FCFE (Acionista)"
              fill="#7c3aed"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
