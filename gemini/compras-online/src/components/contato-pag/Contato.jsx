import React, { useState } from 'react';
import './contato.css';

const Contato = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    // Simulação de envio
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <section className="secao-contato-container">
      <div className="contato-header">
        <h1>Entre em Contato</h1>
        <p>Tire suas dúvidas ou peça um orçamento personalizado.</p>
      </div>

      <div className="contato-conteudo">
        {/* Lado Esquerdo: Informações */}
        <div className="contato-info">
          <div className="card-info">
            <span className="icone">📧</span>
            <div>
              <h3>E-mail</h3>
              <p>contato@seudisign.com</p>
            </div>
          </div>
          <div className="card-info">
            <span className="icone">📱</span>
            <div>
              <h3>WhatsApp</h3>
              <p>(11) 99999-9999</p>
            </div>
          </div>
          <div className="card-info">
            <span className="icone">📍</span>
            <div>
              <h3>Localização</h3>
              <p>Atendimento Online - Brasil</p>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário */}
        <form className="contato-form" onSubmit={handleSubmit}>
          <div className="input-grupo">
            <label>Nome Completo</label>
            <input type="text" placeholder="Seu nome aqui" required />
          </div>
          
          <div className="input-grupo">
            <label>Seu Melhor E-mail</label>
            <input type="email" placeholder="email@exemplo.com" required />
          </div>

          <div className="input-grupo">
            <label>Mensagem</label>
            <textarea rows="4" placeholder="Como podemos te ajudar?" required></textarea>
          </div>

          <button type="submit" className="btn-enviar-contato">
            {enviado ? "Mensagem Enviada! ✅" : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contato;