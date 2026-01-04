import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Service from './components/service-pag/Service';
import './App.css';

// Componentes das Páginas
const Catalogo = () => (
  <div className="pagina">
    <h1>Catálogo de Design</h1>
    <div className="grid-cards">
      <div className="card"><h3>Capa de Vídeo</h3><p>Requisito: Arquivo em alta resolução.</p></div>
      <div className="card"><h3>Logotipo</h3><p>Requisito: Briefing detalhado da marca.</p></div>
      <div className="card"><h3>Cardápio</h3><p>Requisito: Lista de produtos e preços.</p></div>
    </div>
  </div>
);

const Contato = () => (
  <div className="pagina">
    <h1>Fale Conosco</h1>
    <form className="form-contato">
      <input type="text" placeholder="Seu Nome" />
      <input type="email" placeholder="Seu Email" />
      <textarea placeholder="Como podemos ajudar?"></textarea>
      <button className="btn-enviar">Enviar Mensagem</button>
    </form>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/servicos" element={<Service />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;