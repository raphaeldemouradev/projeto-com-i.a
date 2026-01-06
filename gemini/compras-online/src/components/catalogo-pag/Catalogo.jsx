import React from 'react';
import { useNavigate } from 'react-router-dom';
import './catalogo.css';

const categorias = [
  { id: 'banner', nome: 'Banners', img: '🖼️', desc: 'Banners para sites e eventos.' },
  { id: 'logotipo', nome: 'Logotipos', img: '✨', desc: 'Identidades visuais marcantes.' },
  { id: 'capa-video', nome: 'Capas de Vídeo', img: '▶️', desc: 'Thumbnails de alto clique.' },
  { id: 'cardapio', nome: 'Cardápios', img: '🍽️', desc: 'Layouts para gastronomia.' },
];

function Catalogo() {
  const navigate = useNavigate();

  return (
    <div className="catalogo-container">
      <header className="catalogo-header">
        <h1>Nosso Portfólio</h1>
        <p>Explore nossos trabalhos por categoria</p>
      </header>

      <div className="vitrine-grid">
        {categorias.map((cat) => (
          <div key={cat.id} className="vitrine-card">
            <div className="vitrine-emoji">{cat.img}</div>
            <h3>{cat.nome}</h3>
            <p>{cat.desc}</p>
            <button 
              className="btn-ver-mais" 
              onClick={() => navigate(`/detalhes/${cat.id}`)}
            >
              Ver mais projetos
            </button>
          </div>
        ))}
      </div>

      {/* NOVO BOTÃO DE SERVIÇOS AQUI */}
      <div className="container-cta-catalogo">
        <button 
          className="btn-cta-servicos" 
          onClick={() => navigate('/servicos')}
        >
          Ver Preços e Detalhes dos Serviços
        </button>
      </div>
    </div>
  );
}

export default Catalogo;