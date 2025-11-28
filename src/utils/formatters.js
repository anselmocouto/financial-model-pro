export const formatCurrency = (value) => 
  new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL', 
    maximumFractionDigits: 0 
  }).format(value);

export const formatPercent = (value) => 
  new Intl.NumberFormat('pt-BR', { 
    style: 'percent', 
    minimumFractionDigits: 1, 
    maximumFractionDigits: 2 
  }).format(value);

export const formatDate = (date) => 
  new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });