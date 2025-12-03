// src/constants/sectorTemplates.js

export const SECTOR_TEMPLATES = {
    custom: {
      name: "Personalizado",
      description: "Configure manualmente todos os parâmetros",
      base: {
        revenueGrowthStats: [0.15, 0.12, 0.10, 0.08, 0.06, 0.05, 0.045, 0.045, 0.045, 0.045],
        cogsPercent: 0.40,
        opexPercent: 0.25
      },
      optimistic: {
        revenueGrowthStats: [0.25, 0.20, 0.15, 0.10, 0.08, 0.06, 0.05, 0.05, 0.05, 0.05],
        cogsPercent: 0.35,
        opexPercent: 0.22
      },
      pessimistic: {
        revenueGrowthStats: [0.05, 0.04, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02],
        cogsPercent: 0.48,
        opexPercent: 0.30
      }
    },
  
    saude: {
      name: "Saúde (Hospitais/Clínicas)",
      description: "Crescimento estável, margens moderadas, alta previsibilidade",
      base: {
        revenueGrowthStats: [0.12, 0.10, 0.09, 0.08, 0.07, 0.06, 0.05, 0.05, 0.05, 0.05],
        cogsPercent: 0.40,
        opexPercent: 0.28
      },
      optimistic: {
        revenueGrowthStats: [0.18, 0.15, 0.12, 0.10, 0.09, 0.08, 0.07, 0.07, 0.07, 0.07],
        cogsPercent: 0.35,
        opexPercent: 0.25
      },
      pessimistic: {
        revenueGrowthStats: [0.06, 0.05, 0.05, 0.04, 0.04, 0.03, 0.03, 0.03, 0.03, 0.03],
        cogsPercent: 0.45,
        opexPercent: 0.32
      }
    },
  
    tech_saas: {
      name: "Tecnologia/SaaS",
      description: "Crescimento acelerado, margens altas, escalabilidade",
      base: {
        revenueGrowthStats: [0.50, 0.40, 0.30, 0.25, 0.20, 0.15, 0.12, 0.10, 0.10, 0.10],
        cogsPercent: 0.15,
        opexPercent: 0.35
      },
      optimistic: {
        revenueGrowthStats: [0.80, 0.60, 0.45, 0.35, 0.28, 0.22, 0.18, 0.15, 0.15, 0.15],
        cogsPercent: 0.12,
        opexPercent: 0.32
      },
      pessimistic: {
        revenueGrowthStats: [0.25, 0.20, 0.15, 0.12, 0.10, 0.08, 0.07, 0.06, 0.06, 0.06],
        cogsPercent: 0.20,
        opexPercent: 0.40
      }
    },
  
    varejo: {
      name: "Varejo (Lojas/E-commerce)",
      description: "Crescimento moderado, margens apertadas, alta competição",
      base: {
        revenueGrowthStats: [0.15, 0.12, 0.10, 0.08, 0.07, 0.06, 0.05, 0.05, 0.05, 0.05],
        cogsPercent: 0.65,
        opexPercent: 0.20
      },
      optimistic: {
        revenueGrowthStats: [0.25, 0.20, 0.15, 0.12, 0.10, 0.08, 0.07, 0.07, 0.07, 0.07],
        cogsPercent: 0.60,
        opexPercent: 0.18
      },
      pessimistic: {
        revenueGrowthStats: [0.08, 0.06, 0.05, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02],
        cogsPercent: 0.70,
        opexPercent: 0.23
      }
    },
  
    industria: {
      name: "Indústria/Manufatura",
      description: "Crescimento conservador, margens médias, capital intensivo",
      base: {
        revenueGrowthStats: [0.10, 0.08, 0.07, 0.06, 0.05, 0.045, 0.04, 0.04, 0.04, 0.04],
        cogsPercent: 0.55,
        opexPercent: 0.18
      },
      optimistic: {
        revenueGrowthStats: [0.15, 0.12, 0.10, 0.09, 0.08, 0.07, 0.06, 0.06, 0.06, 0.06],
        cogsPercent: 0.50,
        opexPercent: 0.16
      },
      pessimistic: {
        revenueGrowthStats: [0.05, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
        cogsPercent: 0.60,
        opexPercent: 0.22
      }
    },
  
    alimentos_bebidas: {
      name: "Alimentos & Bebidas",
      description: "Crescimento estável, margens médias, sazonalidade moderada",
      base: {
        revenueGrowthStats: [0.12, 0.10, 0.09, 0.08, 0.07, 0.06, 0.05, 0.05, 0.05, 0.05],
        cogsPercent: 0.50,
        opexPercent: 0.22
      },
      optimistic: {
        revenueGrowthStats: [0.18, 0.15, 0.12, 0.10, 0.09, 0.08, 0.07, 0.07, 0.07, 0.07],
        cogsPercent: 0.45,
        opexPercent: 0.20
      },
      pessimistic: {
        revenueGrowthStats: [0.06, 0.05, 0.04, 0.04, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03],
        cogsPercent: 0.55,
        opexPercent: 0.25
      }
    },
  
    educacao: {
      name: "Educação",
      description: "Crescimento previsível, margens boas, baixo CMV",
      base: {
        revenueGrowthStats: [0.15, 0.12, 0.10, 0.09, 0.08, 0.07, 0.06, 0.06, 0.06, 0.06],
        cogsPercent: 0.25,
        opexPercent: 0.40
      },
      optimistic: {
        revenueGrowthStats: [0.22, 0.18, 0.15, 0.12, 0.10, 0.09, 0.08, 0.08, 0.08, 0.08],
        cogsPercent: 0.22,
        opexPercent: 0.38
      },
      pessimistic: {
        revenueGrowthStats: [0.08, 0.06, 0.05, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04],
        cogsPercent: 0.28,
        opexPercent: 0.45
      }
    },
  
    servicos_financeiros: {
      name: "Serviços Financeiros",
      description: "Alta escalabilidade, margens elevadas, baixo CMV",
      base: {
        revenueGrowthStats: [0.20, 0.18, 0.15, 0.12, 0.10, 0.08, 0.07, 0.07, 0.07, 0.07],
        cogsPercent: 0.20,
        opexPercent: 0.35
      },
      optimistic: {
        revenueGrowthStats: [0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.10, 0.10, 0.10, 0.10],
        cogsPercent: 0.18,
        opexPercent: 0.32
      },
      pessimistic: {
        revenueGrowthStats: [0.10, 0.08, 0.07, 0.06, 0.05, 0.05, 0.04, 0.04, 0.04, 0.04],
        cogsPercent: 0.25,
        opexPercent: 0.40
      }
    },
  
    energia: {
      name: "Energia & Utilities",
      description: "Crescimento baixo, margens estáveis, regulamentado",
      base: {
        revenueGrowthStats: [0.08, 0.07, 0.06, 0.05, 0.05, 0.045, 0.04, 0.04, 0.04, 0.04],
        cogsPercent: 0.45,
        opexPercent: 0.25
      },
      optimistic: {
        revenueGrowthStats: [0.12, 0.10, 0.09, 0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06],
        cogsPercent: 0.42,
        opexPercent: 0.23
      },
      pessimistic: {
        revenueGrowthStats: [0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
        cogsPercent: 0.50,
        opexPercent: 0.28
      }
    },
  
    construcao: {
      name: "Construção Civil",
      description: "Cíclico, margens médias, intensivo em capital",
      base: {
        revenueGrowthStats: [0.12, 0.10, 0.08, 0.07, 0.06, 0.05, 0.045, 0.045, 0.045, 0.045],
        cogsPercent: 0.60,
        opexPercent: 0.18
      },
      optimistic: {
        revenueGrowthStats: [0.20, 0.15, 0.12, 0.10, 0.09, 0.08, 0.07, 0.07, 0.07, 0.07],
        cogsPercent: 0.55,
        opexPercent: 0.16
      },
      pessimistic: {
        revenueGrowthStats: [0.05, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
        cogsPercent: 0.65,
        opexPercent: 0.22
      }
    }
  };
  
  // Array para popular dropdown
  export const SECTOR_OPTIONS = Object.entries(SECTOR_TEMPLATES).map(([key, value]) => ({
    value: key,
    label: value.name,
    description: value.description
  }));
  
  // Função helper para aplicar template
  export const applySectorTemplate = (sectorKey, scenario = 'base') => {
    const template = SECTOR_TEMPLATES[sectorKey];
    if (!template) return null;
    
    return {
      revenueGrowthStats: template[scenario].revenueGrowthStats,
      cogsPercent: template[scenario].cogsPercent,
      opexPercent: template[scenario].opexPercent
    };
  };