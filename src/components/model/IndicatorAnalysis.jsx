import React from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown, Award } from 'lucide-react';

export const IndicatorAnalysis = ({ modelData, inputs }) => {
  
  // Função auxiliar para formatar porcentagem
  const formatPercent = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "N/D";
    return `${(value * 100).toFixed(2)}%`;
  };

  // Função auxiliar para formatar moeda
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "N/D";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Análise dos indicadores
  const vpLPositivo = modelData.npvEquity > 0;
  const tirAcimaCusto = modelData.irrEquity > inputs.costOfEquity;
  const moicBom = modelData.moic > 2.0;
  
  // VPL Projeto
  const vplProjetoPositivo = modelData.npvProject > 0;
  const tirProjetoAcimaWacc = modelData.irrProject > inputs.wacc;

  // Status geral do projeto
  const viabilidadeAcionista = vpLPositivo && tirAcimaCusto;
  const viabilidadeProjeto = vplProjetoPositivo && tirProjetoAcimaWacc;
  const statusGeral = viabilidadeAcionista && viabilidadeProjeto;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      
      {/* HEADER */}
      <div className={`px-6 py-4 ${
        statusGeral 
          ? 'bg-gradient-to-r from-green-500 to-green-600' 
          : 'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center gap-3">
          {statusGeral ? (
            <CheckCircle className="w-8 h-8 text-white" />
          ) : (
            <XCircle className="w-8 h-8 text-white" />
          )}
          <div>
            <h3 className="text-2xl font-bold text-white">
              Análise e Interpretação dos Indicadores
            </h3>
            <p className="text-white/90 text-sm mt-1">
              {statusGeral 
                ? "✅ Projeto Viável - Indicadores dentro dos parâmetros esperados" 
                : "⚠️ Projeto Não Viável - Atenção aos indicadores críticos"}
            </p>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="p-6 space-y-6">

        {/* PERSPECTIVA DO ACIONISTA */}
        <div className="border-l-4 border-purple-500 pl-4">
          <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Perspectiva do Acionista (Equity)
          </h4>

          {/* VPL Acionista */}
          <div className="mb-4">
            <div className="flex items-start gap-3 mb-2">
              {vpLPositivo ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  VPL Acionista: <span className={vpLPositivo ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(modelData.npvEquity)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {vpLPositivo ? (
                    <>
                      ✅ <strong>Projeto gera valor para o acionista.</strong> O investimento retorna mais do que o capital investido 
                      em valores presentes, descontados pelo custo de capital próprio (Ke = {formatPercent(inputs.costOfEquity)}).
                    </>
                  ) : (
                    <>
                      ❌ <strong>Projeto destrói valor para o acionista.</strong> O investimento não compensa o custo de oportunidade 
                      do capital próprio (Ke = {formatPercent(inputs.costOfEquity)}). Considere renegociar premissas ou abandonar o projeto.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* TIR Acionista */}
          <div className="mb-4">
            <div className="flex items-start gap-3 mb-2">
              {tirAcimaCusto ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  TIR Acionista: <span className={tirAcimaCusto ? "text-green-600" : "text-red-600"}>
                    {formatPercent(modelData.irrEquity)}
                  </span>
                  {" vs Ke: "}
                  <span className="text-gray-600">{formatPercent(inputs.costOfEquity)}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {tirAcimaCusto ? (
                    <>
                      ✅ <strong>Retorno superior ao custo de capital próprio.</strong> A TIR de {formatPercent(modelData.irrEquity)} 
                      é maior que o Ke de {formatPercent(inputs.costOfEquity)}, indicando que o projeto remunera adequadamente 
                      o risco do acionista.
                    </>
                  ) : (
                    <>
                      ❌ <strong>Retorno inferior ao custo de capital próprio.</strong> A TIR de {formatPercent(modelData.irrEquity)} 
                      é menor que o Ke de {formatPercent(inputs.costOfEquity)}, indicando que o projeto não compensa o risco 
                      assumido pelo acionista.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* MOIC */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              {moicBom ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  MOIC: <span className={moicBom ? "text-green-600" : "text-yellow-600"}>
                    {modelData.moic.toFixed(2)}x
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {modelData.moic >= 5.0 ? (
                    <>
                      🏆 <strong>Retorno excepcional!</strong> O projeto retorna {modelData.moic.toFixed(2)}x o capital investido. 
                      Múltiplo superior a 5x indica um investimento de alto valor.
                    </>
                  ) : modelData.moic >= 2.0 ? (
                    <>
                      ✅ <strong>Retorno excelente.</strong> O capital investido foi multiplicado por {modelData.moic.toFixed(2)}x. 
                      MOIC acima de 2x é considerado um bom retorno em private equity.
                    </>
                  ) : modelData.moic >= 1.0 ? (
                    <>
                      ⚠️ <strong>Retorno modesto.</strong> O projeto retorna {modelData.moic.toFixed(2)}x o capital investido. 
                      Múltiplo entre 1x e 2x indica retorno positivo, mas abaixo do ideal para investimentos de risco.
                    </>
                  ) : (
                    <>
                      ❌ <strong>Perda de capital.</strong> MOIC de {modelData.moic.toFixed(2)}x indica que o projeto não recupera 
                      nem o capital investido inicialmente.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PERSPECTIVA DO PROJETO */}
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Perspectiva do Projeto (Unlevered)
          </h4>

          {/* VPL Projeto */}
          <div className="mb-4">
            <div className="flex items-start gap-3 mb-2">
              {vplProjetoPositivo ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  VPL Projeto: <span className={vplProjetoPositivo ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(modelData.npvProject)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {vplProjetoPositivo ? (
                    <>
                      ✅ <strong>Projeto operacionalmente viável.</strong> Independente da estrutura de capital, o projeto 
                      gera valor quando avaliado pelo WACC de {formatPercent(inputs.wacc)}.
                    </>
                  ) : (
                    <>
                      ❌ <strong>Projeto operacionalmente inviável.</strong> Mesmo desconsiderando a estrutura de capital, 
                      o projeto não gera valor quando descontado pelo WACC de {formatPercent(inputs.wacc)}.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* TIR Projeto */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              {tirProjetoAcimaWacc ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  TIR Projeto: <span className={tirProjetoAcimaWacc ? "text-green-600" : "text-red-600"}>
                    {formatPercent(modelData.irrProject)}
                  </span>
                  {" vs WACC: "}
                  <span className="text-gray-600">{formatPercent(inputs.wacc)}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {tirProjetoAcimaWacc ? (
                    <>
                      ✅ <strong>Retorno operacional acima do custo médio ponderado de capital.</strong> A TIR do projeto 
                      de {formatPercent(modelData.irrProject)} supera o WACC de {formatPercent(inputs.wacc)}, indicando 
                      que o negócio é rentável independentemente da forma de financiamento.
                    </>
                  ) : (
                    <>
                      ❌ <strong>Retorno operacional abaixo do WACC.</strong> A TIR do projeto de {formatPercent(modelData.irrProject)} 
                      é inferior ao WACC de {formatPercent(inputs.wacc)}, indicando que o negócio não gera retorno adequado 
                      mesmo antes de considerar a estrutura de capital.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONCLUSÃO E RECOMENDAÇÃO */}
        <div className={`rounded-xl p-4 ${
          statusGeral 
            ? 'bg-green-50 border-2 border-green-200' 
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            {statusGeral ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            Conclusão e Recomendação
          </h4>
          <p className="text-sm text-gray-700">
            {statusGeral ? (
              <>
                <strong className="text-green-700">✅ PROJETO RECOMENDADO.</strong> Todos os indicadores principais 
                (VPL Acionista, TIR vs Ke, VPL Projeto, TIR vs WACC) estão dentro dos parâmetros de viabilidade. 
                O projeto cria valor tanto para o acionista quanto na perspectiva operacional, sendo uma oportunidade 
                de investimento atrativa.
              </>
            ) : (
              <>
                <strong className="text-red-700">❌ PROJETO NÃO RECOMENDADO.</strong> Um ou mais indicadores críticos 
                estão fora dos parâmetros de viabilidade. Recomenda-se revisar as premissas operacionais, estrutura 
                de capital, ou considerar a não execução do investimento. Analise especialmente os indicadores com 
                status negativo acima.
              </>
            )}
          </p>
        </div>

        {/* OBSERVAÇÕES */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm text-blue-900">
            <strong>📋 Nota:</strong> Esta análise considera os parâmetros informados nas premissas. 
            Alterações nas taxas de desconto (WACC e Ke), crescimento de receita, margens operacionais ou 
            estrutura de capital podem modificar significativamente os resultados.
          </p>
        </div>

      </div>
    </div>
  );
};