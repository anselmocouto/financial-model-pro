import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export const TablesTab = ({ projection, inputs }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-sm text-right font-mono border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b border-gray-300">
              <th className="p-3 text-left sticky left-0 bg-gray-100 z-10 font-semibold">
                Demonstrativo (R$)
              </th>
              {projection.map(y => (
                <th key={y.year} className="p-3 min-w-[110px] font-semibold">
                  Ano {y.year}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* ======================= DRE ======================= */}
            <tr>
              <td colSpan={12} className="pt-8 pb-3 font-bold text-gray-900 text-left uppercase text-xs tracking-wide">
                1 — DRE Gerencial
              </td>
            </tr>

            <SectionRow title="Receita Líquida" sticky />
            {projection.map(y => (
              <ValueRow key={y.year} value={y.revenue} />
            ))}

            <SectionRow title="(-) CMV" sticky textColor="text-red-500" />
            {projection.map(y => (
              <ValueRow key={y.year} value={y.cogs} textColor="text-red-500" />
            ))}

            <TotalRow title="Lucro Bruto" values={projection.map(y => y.grossProfit)} />

            <SectionRow title="(-) Despesas Operacionais" sticky textColor="text-red-500" />
            {projection.map(y => (
              <ValueRow key={y.year} value={y.opex} textColor="text-red-500" />
            ))}

            <HighlightRow title="EBITDA" color="blue" values={projection.map(y => y.ebitda)} />

            <SectionRow title="(-) Depreciação" sticky textColor="text-gray-500" />
            {projection.map(y => (
              <ValueRow key={y.year} value={y.depreciation} textColor="text-gray-500" />
            ))}

            <TotalRow title="EBIT" values={projection.map(y => y.ebit)} />

            <SectionRow title="(-) Despesa Financeira" sticky textColor="text-red-500" />
            {projection.map(y => (
              <ValueRow key={y.year} value={y.interestExpense} textColor="text-red-500" />
            ))}

            <TotalRow title="LAIR (Pré-Tax)" values={projection.map(y => y.profitBeforeTax)} />

            <SectionRow title="(-) Impostos" sticky textColor="text-red-500" />
            {projection.map(y => (
              <ValueRow key={y.year} value={y.taxes} textColor="text-red-500" />
            ))}

            <HighlightRow
              title="Lucro Líquido"
              color="purple"
              values={projection.map(y => y.netIncome)}
            />

            {/* ======================= BALANÇO ======================= */}

            <tr>
              <td colSpan={12} className="pt-8 pb-3 font-bold text-gray-900 text-left uppercase text-xs tracking-wide">
                2 — Balanço Patrimonial
              </td>
            </tr>

            <SectionLabel title="Ativo" />

            <StickySection title="Caixa Acumulado" color="text-blue-600" values={projection.map(y => y.bs_cash)} />

            <StickySection title="Contas a Receber" values={projection.map(y => y.bs_receivables)} />
            <StickySection title="Estoques" values={projection.map(y => y.bs_inventory)} />
            <StickySection title="Imobilizado Líquido" values={projection.map(y => y.bs_netPPE)} />

            <TotalRow title="Total Ativo" values={projection.map(y => y.bs_totalAssets)} />

            <SectionLabel title="Passivo & PL" />

            <StickySection title="Fornecedores" values={projection.map(y => y.bs_payables)} />

            <StickySection
              title="Dívida"
              values={projection.map(y => y.bs_debt)}
              color="text-red-600"
            />

            <StickySection
              title="Patrimônio Líquido"
              values={projection.map(y => y.bs_equity)}
              color="text-purple-600"
            />

            {/* ======================= CASH FLOW ======================= */}

            <tr>
              <td colSpan={12} className="pt-8 pb-3 font-bold text-gray-900 text-left uppercase text-xs tracking-wide">
                3 — Fluxo de Caixa
              </td>
            </tr>

            <HighlightRow title="EBITDA" color="blue" values={projection.map(y => y.ebitda)} />

            <StickySection
              title="(-) Impostos"
              values={projection.map(y => y.ebitda * inputs.taxRate * -1)}
              color="text-red-500"
            />

            <StickySection
              title="(-) Var. Capital de Giro"
              values={projection.map(y => y.changeNwc)}
              dynamicColor
            />

            <StickySection
              title="(-) Capex"
              color="text-red-500"
              values={projection.map(y => y.capex)}
            />

            <TotalRow title="FCFF (Firma)" values={projection.map(y => y.fcff)} />

            <HighlightRow title="FCFE (Acionista)" color="purple" values={projection.map(y => y.fcfe)} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENTES AUXILIARES (estilo corporativo do dashboard)
   ============================================================ */

const SectionLabel = ({ title }) => (
  <tr>
    <td colSpan={12} className="py-2 text-left text-gray-600 uppercase text-xs font-semibold border-t border-gray-200">
      {title}
    </td>
  </tr>
);

const SectionRow = ({ title, sticky, textColor = "text-gray-700" }) => (
  <tr className="hover:bg-gray-50">
    <td className={`p-2 text-left font-medium ${textColor} ${sticky ? "sticky left-0 bg-white z-10" : ""}`}>
      {title}
    </td>
  </tr>
);

const ValueRow = ({ value, textColor = "" }) => (
  <td className={`p-2 ${textColor}`}>{formatCurrency(value)}</td>
);

const TotalRow = ({ title, values }) => (
  <tr className="bg-gray-50 font-semibold border-t border-b border-gray-200">
    <td className="p-2 text-left sticky left-0 bg-gray-50 z-10">{title}</td>
    {values.map((val, idx) => (
      <td key={idx} className="p-2 font-semibold">{formatCurrency(val)}</td>
    ))}
  </tr>
);

const HighlightRow = ({ title, color, values }) => (
  <tr className={`bg-${color}-50`}>
    <td className={`p-2 text-left font-bold sticky left-0 bg-${color}-50 z-10 text-${color}-700`}>
      {title}
    </td>
    {values.map((val, idx) => (
      <td key={idx} className={`p-2 font-bold text-${color}-700`}>
        {formatCurrency(val)}
      </td>
    ))}
  </tr>
);

const StickySection = ({ title, values, color, dynamicColor }) => (
  <tr className="hover:bg-gray-50">
    <td className={`p-2 text-left sticky left-0 bg-white font-medium z-10 ${color ?? ""}`}>
      {title}
    </td>
    {values.map((val, idx) => (
      <td
        key={idx}
        className={`p-2 ${
          dynamicColor ? (val < 0 ? "text-red-500" : "text-green-600") : color ?? ""
        }`}
      >
        {formatCurrency(val)}
      </td>
    ))}
  </tr>
);
