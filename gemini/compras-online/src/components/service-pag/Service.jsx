import React, { useState } from 'react';
import './service.css';
import Checkout from '../checkout-pag/Checkout';
import { Link } from 'react-router-dom';

const produtosDesign = [
  { id: 1, nome: "Banner Profissional", preco: 250, icone: "🖼️", desc: "Artes impactantes para sites, eventos e redes sociais." },
  { id: 2, nome: "Logotipo Exclusivo", preco: 700, icone: "✨", desc: "Identidade visual única para destacar sua marca no mercado." },
  { id: 3, nome: "Capa de Vídeo (Thumb)", preco: 180, icone: "▶️", desc: "Thumbnails otimizadas para aumentar seus cliques no YouTube." },
  { id: 4, nome: "Cardápio Moderno", preco: 350, icone: "🍽️", desc: "Layout profissional para restaurantes e cardápios digitais." },
];

const Service = () => {
  const [itemParaCheckout, setItemParaCheckout] = useState(null);

  // Alterna para a tela de Checkout se um item for selecionado
  if (itemParaCheckout) {
    return (
      <Checkout 
        item={itemParaCheckout} 
        onVoltar={() => setItemParaCheckout(null)} 
        onFinalizar={() => {
          alert("Pedido recebido! Entraremos em contato em breve.");
          setItemParaCheckout(null);
        }} 
      />
    );
  }

  return (
    <div className="pagina-servico">
      <div className="header-servico">
        <h1 className="titulo-servico">Nossos Serviços</h1>
        <p className="subtitulo-servico">Soluções de design sob medida para o seu projeto</p>
      </div>
      
      <div className="grid-servicos-componente">
        {produtosDesign.map((produto) => (
          <div key={produto.id} className="card-servico-unidade">
            <div className="icone-servico">{produto.icone}</div>
            <h3>{produto.nome}</h3>
            <p>{produto.desc}</p>
            <div className="preco-container">
              <span className="moeda">R$</span>
              <span className="valor">{produto.preco}</span>
            </div>
            <button 
              className="btn-fazer-pedido"
              onClick={() => setItemParaCheckout(produto)}
            >
              Fazer Pedido
            </button>
          </div>
        ))}
      </div>

      {/* Seção final para dúvidas que leva ao Contato */}
      <div className="rodape-servicos-contato">
        <h3>Procura algo diferente ou personalizado?</h3>
        <p>Estamos prontos para criar um projeto exclusivo para você.</p>
        <Link to="/contato" className="btn-duvida-contato">Tem alguma dúvida? Fale conosco!</Link>
      </div>
    </div>
  );
};

export default Service;