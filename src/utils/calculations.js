export const calculateIRR = (cashFlows, guess = 0.1) => {
  const maxIter = 1000;
  const tol = 0.000001;
  let rate = guess;

  for (let i = 0; i < maxIter; i++) {
    let npv = 0;
    let dNpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      dNpv -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }
    const newRate = rate - npv / dNpv;
    if (Math.abs(newRate - rate) < tol) return newRate;
    rate = newRate;
  }
  return rate;
};

export const calculateFinancialModel = (inputs) => {
  const horizon = 10;
  const years = Array.from({ length: horizon + 1 }, (_, i) => i);
  
  let projection = [];
  let accumulatedLosses = 0;
  let debtBalance = inputs.useDebt ? inputs.debtAmount : 0;
  let accumCash = inputs.cashReserve;
  let accumNetPPE = inputs.initialCapex;
  let accumRetainedEarnings = 0;
  let shareCapital = inputs.initialCapex + inputs.cashReserve - (inputs.useDebt ? inputs.debtAmount : 0);

  for (let year of years) {
    let row = { year };

    if (year === 0) {
      // Ano 0 - Investimento inicial
      row.revenue = 0;
      row.cogs = 0;
      row.grossProfit = 0;
      row.opex = 0;
      row.ebitda = 0;
      row.depreciation = 0;
      row.ebit = 0;
      row.interestExpense = 0;
      row.profitBeforeTax = 0;
      row.taxes = 0;
      row.netIncome = 0;
      row.receivables = 0;
      row.inventory = 0;
      row.payables = 0;
      row.nwc = 0;
      row.changeNwc = 0;
      row.capex = -inputs.initialCapex;
    } else {
      // DRE
      const prevRev = projection[year - 1].revenue || inputs.initialRevenue;
      const growth = inputs.revenueGrowthStats[year - 1] || 0.04;
      
      row.revenue = year === 1 ? inputs.initialRevenue : prevRev * (1 + growth);
      row.cogs = -row.revenue * inputs.cogsPercent;
      row.grossProfit = row.revenue + row.cogs;
      row.opex = -row.revenue * inputs.opexPercent;
      row.ebitda = row.grossProfit + row.opex;
      
      row.depreciation = year <= inputs.depreciationYears 
        ? -(inputs.initialCapex / inputs.depreciationYears) 
        : 0;
      row.depreciation -= (row.revenue * inputs.maintenanceCapexRate) / 5;

      row.ebit = row.ebitda + row.depreciation;
      row.interestExpense = inputs.useDebt ? -(debtBalance * inputs.debtInterestRate) : 0;
      row.profitBeforeTax = row.ebit + row.interestExpense;
      
      // Impostos com compensação de prejuízos
      let taxableIncome = 0;
      if (row.profitBeforeTax < 0) {
        accumulatedLosses += Math.abs(row.profitBeforeTax);
        taxableIncome = 0;
      } else {
        const maxOffset = row.profitBeforeTax * 0.30;
        const taxOffset = Math.min(accumulatedLosses, maxOffset);
        taxableIncome = row.profitBeforeTax - taxOffset;
        accumulatedLosses -= taxOffset;
      }
      row.taxes = -(taxableIncome * inputs.taxRate);
      row.netIncome = row.profitBeforeTax + row.taxes;

      // Capital de Giro
      row.receivables = (row.revenue / 360) * inputs.dso;
      row.inventory = (Math.abs(row.cogs) / 360) * inputs.dio;
      row.payables = (Math.abs(row.cogs) / 360) * inputs.dpo;
      row.nwc = row.receivables + row.inventory - row.payables;
      
      const prevNwc = projection[year - 1].nwc;
      row.changeNwc = -(row.nwc - prevNwc);
      
      row.capex = -(row.revenue * inputs.maintenanceCapexRate);
    }

    // Fluxo de Caixa
    const ebitAfterTax = row.ebit * (1 - inputs.taxRate);
    row.fcff = year === 0 
      ? row.capex 
      : (ebitAfterTax + Math.abs(row.depreciation) + row.changeNwc + row.capex);

    // Dívida
    let principalPayment = 0;
    let debtIssuance = 0;
    
    if (year === 0 && inputs.useDebt) {
      debtIssuance = inputs.debtAmount;
    } else if (inputs.useDebt && year > inputs.debtGrace && year <= (inputs.debtGrace + inputs.debtTerm)) {
      principalPayment = -(inputs.debtAmount / inputs.debtTerm);
    }

    row.debtFlow = debtIssuance + principalPayment;
    debtBalance = Math.max(0, debtBalance + principalPayment);
    
    if (year === 0) {
      row.fcfe = row.capex + debtIssuance - inputs.cashReserve;
    } else {
      row.fcfe = row.netIncome + Math.abs(row.depreciation) + row.changeNwc + row.capex + principalPayment;
    }

    // Balanço Patrimonial
    if (year > 0) {
      accumCash += row.fcfe;
      accumNetPPE += (Math.abs(row.capex) - Math.abs(row.depreciation));
      accumRetainedEarnings += row.netIncome;
    }

    row.bs_cash = accumCash;
    row.bs_receivables = row.receivables;
    row.bs_inventory = row.inventory;
    row.bs_netPPE = Math.max(0, accumNetPPE);
    row.bs_totalAssets = row.bs_cash + row.bs_receivables + row.bs_inventory + row.bs_netPPE;
    row.bs_payables = row.payables;
    row.bs_debt = debtBalance;
    row.bs_totalLiabilities = row.bs_payables + row.bs_debt;
    row.bs_equity = shareCapital + accumRetainedEarnings;

    projection.push(row);
  }
  
  // Valuation
  const terminalYear = projection[horizon];
  const tvFcff = (terminalYear.fcff * (1 + inputs.perpetuityGrowth)) / (inputs.wacc - inputs.perpetuityGrowth);
  const tvFcfe = (terminalYear.fcfe * (1 + inputs.perpetuityGrowth)) / (inputs.costOfEquity - inputs.perpetuityGrowth);
  
  const discountedFcff = projection.map((p, i) => i === 0 ? p.fcff : p.fcff / Math.pow(1 + inputs.wacc, i));
  const discountedFcfe = projection.map((p, i) => i === 0 ? p.fcfe : p.fcfe / Math.pow(1 + inputs.costOfEquity, i));
  
  const presentValueTvFcff = tvFcff / Math.pow(1 + inputs.wacc, horizon);
  const presentValueTvFcfe = tvFcfe / Math.pow(1 + inputs.costOfEquity, horizon);

  const npvProject = discountedFcff.reduce((a, b) => a + b, 0) + presentValueTvFcff;
  const npvEquity = discountedFcfe.reduce((a, b) => a + b, 0) + presentValueTvFcfe;
  
  const flowStreamFcff = projection.map(p => p.fcff);
  flowStreamFcff[horizon] += tvFcff;
  const flowStreamFcfe = projection.map(p => p.fcfe);
  flowStreamFcfe[horizon] += tvFcfe;

  const irrProject = calculateIRR(flowStreamFcff);
  const irrEquity = calculateIRR(flowStreamFcfe);
  
  const totalEquityIn = Math.abs(projection[0].fcfe);
  const totalEquityOut = projection.slice(1).reduce((sum, p) => sum + Math.max(0, p.fcfe), 0) + tvFcfe;
  const moic = totalEquityIn > 0 ? (totalEquityOut / totalEquityIn) : 0;

  return { projection, npvProject, npvEquity, irrProject, irrEquity, moic };
};

export const exportToCSV = (simulation) => {
  let csv = "Simulacao;Data\n";
  csv += `${simulation.name};${new Date(simulation.timestamp).toLocaleString('pt-BR')}\n\n`;
  
  csv += "Ano;Receita;CMV;Lucro Bruto;EBITDA;EBIT;Lucro Liquido;Caixa;FCFE\n";
  
  simulation.projection.forEach(row => {
    csv += `${row.year};${row.revenue};${row.cogs};${row.grossProfit};${row.ebitda};${row.ebit};${row.netIncome};${row.bs_cash};${row.fcfe}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `modelagem_${simulation.id}_${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};