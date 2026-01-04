import React, { useState } from 'react';
import './checkout.css';

function Checkout({ item, onFinalizar, onVoltar }) {
  const [etapa, setEtapa] = useState(1); // 1: Agendamento, 2: Pagamento

  if (!item) return null;

  return (
    <div className="checkout-container">
      {/* Botão de Voltar Geral (Flutuante no topo) */}
      <button className="btn-voltar-geral" onClick={onVoltar}>
        ← Voltar para Serviços
      </button>

      <div className="checkout-card">
        {/* Barra de Progresso */}
        <div className="barra-progresso">
          <div className={`passo ${etapa >= 1 ? 'ativo' : ''}`}>
            <span className="numero">1</span>
            <span className="label">Agendamento</span>
          </div>
          <div className="linha"></div>
          <div className={`passo ${etapa === 2 ? 'ativo' : ''}`}>
            <span className="numero">2</span>
            <span className="label">Pagamento</span>
          </div>
        </div>

        {etapa === 1 ? (
          <div className="aba-checkout">
            <h2>Agendar {item.nome}</h2>
            <p className="instrucao">Selecione a data ideal para iniciarmos seu design.</p>
            
            <div className="campo-grupo">
              <label>Data de Início</label>
              <input type="date" className="input-checkout" />
            </div>

            <div className="campo-grupo">
              <label>Briefing rápido (Opcional)</label>
              <textarea placeholder="Ex: Prefiro cores escuras..." className="input-checkout"></textarea>
            </div>

            <button className="btn-principal" onClick={() => setEtapa(2)}>
              Próximo: Pagamento
            </button>
          </div>
        ) : (
          <div className="aba-checkout">
            <h2>Finalizar Compra</h2>
            
            <div className="resumo-caixa">
              <div className="resumo-linha">
                <span>Serviço:</span>
                <strong>{item.nome}</strong>
              </div>
              <div className="resumo-linha total">
                <span>Total:</span>
                <strong>R$ {item.preco.toLocaleString()}</strong>
              </div>
            </div>

            <div className="campo-grupo">
              <label>Dados do Cartão</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="input-checkout" />
            </div>

            <div className="botoes-acao">
              <button className="btn-secundario" onClick={() => setEtapa(1)}>
                Voltar
              </button>
              <button className="btn-finalizar" onClick={() => onFinalizar()}>
                Confirmar e Pagar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;