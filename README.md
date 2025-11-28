# 💼 Financial Model Pro

Sistema completo de Modelagem Financeira Empresarial com autenticação multi-usuário, desenvolvido com React, Supabase e Tailwind CSS.

## Funcionalidades

### Modelagem Financeira Completa
- ✅ **DRE (Demonstração do Resultado do Exercício)** - Projeção completa de receitas, custos e lucros
- ✅ **Balanço Patrimonial** - Ativos, Passivos e Patrimônio Líquido
- ✅ **Fluxo de Caixa Livre** - FCFF (Firma) e FCFE (Acionista)
- ✅ **Capital de Giro** - Gestão de NCG (Necessidade de Capital de Giro)
- ✅ **Valuation Profissional** - VPL, TIR, MOIC, Perpetuidade

### Sistema Multi-Usuário
- ✅ Autenticação segura com Supabase Auth
- ✅ Cadastro e Login de usuários
- ✅ Row Level Security (RLS) - Cada usuário vê apenas seus dados
- ✅ Perfis personalizados

### Recursos Avançados
- ✅ **3 Cenários Pré-configurados**: Base, Otimista, Pessimista
- ✅ **Gráficos Interativos** com Recharts
- ✅ **Tabelas Detalhadas** com todos os demonstrativos
- ✅ **Histórico de Simulações** por usuário
- ✅ **Exportação para CSV**
- ✅ **Dashboard Executivo** com estatísticas

## Tecnologias

- **Frontend**: React 18 + Vite
- **Estilização**: Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Gráficos**: Recharts
- **Roteamento**: React Router v6
- **Ícones**: Lucide React

## 📦 Instalação

### 1. Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (https://supabase.com)
- Git instalado

### 2. Clonar o Repositório
```bash
git clone https://github.com/SEU-USUARIO/financial-model-pro.git
cd financial-model-pro
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:
```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**Onde encontrar as credenciais:**
1. Acesse seu projeto no Supabase
2. Vá em **Settings** → **API**
3. Copie a **URL** e a **anon public key**

### 5. Configurar o Banco de Dados

No **SQL Editor** do Supabase, execute o script em `sql/setup.sql` que cria:
- Tabelas (`profiles`, `financial_simulations`)
- Políticas de segurança (RLS)
- Triggers automáticos
- Índices para performance

### 6. Rodar o Projeto
```bash
npm run dev
```

Acesse: http://localhost:3000

## 📂 Estrutura do Projeto
```
financial-model-pro/
├── src/
│   ├── components/          # Componentes React
│   │   ├── auth/           # Login, Registro, ProtectedRoute
│   │   ├── layout/         # Header, Sidebar, MainLayout
│   │   ├── model/          # KPICards, Charts, Tables, History
│   │   └── common/         # Button, LoadingSpinner
│   ├── contexts/           # AuthContext (Estado Global)
│   ├── hooks/              # Custom Hooks
│   │   ├── useAuth.js
│   │   ├── useFinancialModel.js
│   │   └── useSimulations.js
│   ├── pages/              # Páginas
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ModelPage.jsx
│   ├── services/           # API Services
│   │   ├── authService.js
│   │   └── supabaseService.js
│   ├── utils/              # Funções Utilitárias
│   │   ├── formatters.js   # Formatação de moeda, %, data
│   │   └── calculations.js # Motor de cálculo financeiro
│   ├── config/             # Configurações
│   │   └── supabase.js
│   ├── App.jsx             # Componente Principal
│   ├── main.jsx            # Entry Point
│   └── index.css           # Estilos Globais
├── sql/
│   └── setup.sql           # Script SQL para Supabase
├── .env.example            # Template de variáveis
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Como Usar

### 1. Criar Conta
- Acesse `/register`
- Preencha nome, email e senha
- Confirme o email (verifique sua caixa de entrada)

### 2. Fazer Login
- Acesse `/login`
- Entre com suas credenciais

### 3. Dashboard
- Veja estatísticas das suas simulações
- Acesse simulações recentes

### 4. Nova Modelagem
- Clique em "Criar Nova Modelagem"
- Ajuste as **premissas** no painel lateral:
  - Receita inicial
  - Margens (CMV, Despesas)
  - Capital de Giro (PMR, PME, PMP)
  - Investimentos (Capex)
  - Dívida (se usar financiamento)
  - Taxas de desconto (WACC, Ke)
- Escolha um **cenário**: Base, Otimista ou Pessimista
- Veja os resultados em:
  - **KPIs**: VPL, TIR, MOIC
  - **Gráficos**: Evolução da receita, EBITDA, fluxo de caixa
  - **Demonstrativos**: DRE, Balanço, FCF completos
- Clique em **"Gravar Simulação"** para salvar no banco

### 5. Histórico
- Acesse a aba **"Histórico"**
- Veja todas as suas simulações salvas
- **Exporte** para CSV
- **Delete** simulações antigas

## 🔒 Segurança

- **Row Level Security (RLS)** - Cada usuário acessa apenas seus dados
- **Autenticação segura** com Supabase Auth
- **Variáveis de ambiente** protegidas (nunca commitadas)
- **Políticas de acesso** granulares no banco

## 📊 Demonstrativos Gerados

### 1. DRE (Demonstração de Resultado)
- Receita Líquida
- (-) CMV
- = Lucro Bruto
- (-) Despesas Operacionais
- = **EBITDA**
- (-) Depreciação
- = **EBIT**
- (-) Despesas Financeiras
- (-) Impostos (com compensação de prejuízos)
- = **Lucro Líquido**

### 2. Balanço Patrimonial
**Ativo:**
- Caixa Acumulado
- Contas a Receber
- Estoques
- Imobilizado Líquido

**Passivo:**
- Fornecedores
- Dívida
- Patrimônio Líquido

### 3. Fluxo de Caixa Livre
- **FCFF (Free Cash Flow to Firm)** - Fluxo para empresa
- **FCFE (Free Cash Flow to Equity)** - Fluxo para acionistas

### 4. Valuation
- **VPL** (Valor Presente Líquido)
- **TIR** (Taxa Interna de Retorno)
- **MOIC** (Multiple on Invested Capital)
- **Terminal Value** (Perpetuidade)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

MIT License - Livre para uso pessoal e comercial

## 👨‍💻 Autor

Desenvolvido por [ANSELMO COUTO]

## 📞 Suporte

- 📧 Email: aacouto46@gmail.com
- 🐛 Issues: https://github.com/SEU-USUARIO/financial-model-pro/issues
- 📖 Docs: https://github.com/SEU-USUARIO/financial-model-pro/wiki

---

⭐ Se este projeto foi útil, deixe uma estrela no GitHub!