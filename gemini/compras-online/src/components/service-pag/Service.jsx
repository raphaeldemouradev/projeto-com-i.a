import React, { useState } from 'react';
import './service.css';
// Importamos o Checkout da nova pasta que você criou
import Checkout from '../checkout-pag/Checkout'; 

const produtosDesign = [
  { id: 1, nome: "Banner Profissional", preco: 250, icone: "🖼️", desc: "Artes para sites e redes sociais." },
  { id: 2, nome: "Logotipo Exclusivo", preco: 700, icone: "✨", desc: "Identidade visual única para sua marca." },
  { id: 3, nome: "Capa de Vídeo", preco: 180, icone: "▶️", desc: "Thumbnails que aumentam seus cliques." },
  { id: 4, nome: "Cardápio Digital", preco: 350, icone: "🍽️", desc: "Design moderno para seu restaurante." },
];

const Service = () => {
  // Estado para controlar qual item foi clicado para compra
  const [itemParaCheckout, setItemParaCheckout] = useState(null);

  // Se o usuário clicou em um botão, mostramos a tela de Checkout/Agendamento
  if (itemParaCheckout) {
    return (
      <Checkout 
        item={itemParaCheckout} 
        onVoltar={() => setItemParaCheckout(null)} 
        onFinalizar={() => {
          alert("Pedido enviado com sucesso!");
          setItemParaCheckout(null);
        }} 
      />
    );
  }

  // Caso contrário, mostra a vitrine de serviços normal
  return (
    <div className="pagina-servico">
      <h1 className="titulo-servico">Nossos Serviços de Design</h1>
      <p className="subtitulo-servico">Escolha a solução ideal para o seu negócio</p>
      
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
    </div>
  );
};

export default Service;