# financial-model-pro
Sistema de Modelagem Financeira com autenticação multi-usuário


## Tecnologias

- **React** + Vite
- **Supabase** (Backend + Auth + Database)
- **TailwindCSS** (Estilização)
- **Recharts** (Gráficos)
- **React Router** (Navegação)

## Funcionalidades

- Sistema de Login/Registro
- Autenticação com Supabase Auth
- Multi-usuários isolados (Row Level Security)
- DRE, Balanço Patrimonial, Fluxo de Caixa
- Valuation (VPL, TIR, MOIC)
- 3 Cenários (Base, Otimista, Pessimista)
- Histórico de simulações por usuário
- Exportação para CSV
- Gráficos interativos

##  Instalação
```bash
# 1. Clonar repositório
git clone https://github.com/anselmocouto/financial-model-pro.git
cd financial-model-pro

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# 4. Rodar projeto
npm run dev
```

## Configuração do Supabase

Execute os scripts SQL disponíveis em `/sql/setup.sql` no SQL Editor do Supabase.

## Licença

MIT