import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detalhes.css';

const Detalhes = () => {
  const { id } = useParams(); // Pega 'banner', 'logotipo', etc., da URL
  const navigate = useNavigate();

  // Banco de dados das ilustrações/projetos
  const bancoDeDadosProjetos = {
    'banner': [
      { id: 1, titulo: "Banner Black Friday", desc: "Design focado em conversão." },
      { id: 2, titulo: "Banner Evento Gamer", desc: "Estilo moderno e neon." },
      { id: 3, titulo: "Banner Promo Verão", desc: "Cores vibrantes e solares." },
      { id: 4, titulo: "Banner Corporativo", desc: "Clean e profissional." },
    ],
    'logotipo': [
      { id: 1, titulo: "Logo Minimalista 'Lumina'", desc: "Foco em tipografia." },
      { id: 2, titulo: "Logo Tech Solutions", desc: "Símbolo geométrico moderno." },
      { id: 3, titulo: "Logo Restaurante Gourmet", desc: "Identidade visual rústica." },
      { id: 4, titulo: "Logo Marca Pessoal", desc: "Assinatura elegante." },
    ],
    'capa-video': [
      { id: 1, titulo: "Thumb Tutorial React", desc: "Foco em leitura rápida." },
      { id: 2, titulo: "Thumb Gameplay Épica", desc: "Destaque para expressões." },
      { id: 3, titulo: "Thumb Vlog de Viagem", desc: "Tratamento de imagem premium." },
      { id: 4, titulo: "Thumb Podcast Semanal", desc: "Layout padrão de série." },
    ],
    'cardapio': [
      { id: 1, titulo: "Cardápio Pizzaria", desc: "Design italiano clássico." },
      { id: 2, titulo: "Menu Hamburgueria", desc: "Estilo industrial e dark." },
      { id: 3, titulo: "Lista de Vinhos", desc: "Sofisticação e elegância." },
      { id: 4, titulo: "Cardápio Digital QR Code", desc: "Interatividade e clareza." },
    ]
  };

  // Seleciona os projetos com base no ID da URL
  const projetosExibidos = bancoDeDadosProjetos[id] || [];

  return (
    <div className="pagina-detalhes">
      <div className="topo-detalhes">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          ← Voltar ao Catálogo
        </button>
        <h1>Projetos de {id.replace('-', ' ')}</h1>
        <p>Confira alguns de nossos trabalhos selecionados nesta categoria.</p>
      </div>

      <div className="galeria-projetos">
        {projetosExibidos.map((projeto) => (
          <div key={projeto.id} className="card-projeto">
            <div className="ilustracao-placeholder">
              <span>Ilustração {id} #{projeto.id}</span>
            </div>
            <div className="info-projeto">
              <h3>{projeto.titulo}</h3>
              <p>{projeto.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detalhes;