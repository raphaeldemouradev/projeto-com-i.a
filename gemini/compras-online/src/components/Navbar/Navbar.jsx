import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Fecha o menu ao clicar em um link
  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">ProService</div>

      {/* Ícone do Hambúrguer */}
      <div className={`hamburger ${menuAberto ? 'ativo' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Links de Navegação */}
      <ul className={`nav-links ${menuAberto ? 'aberto' : ''}`}>
        <li><Link to="/" onClick={fecharMenu}>Catálogo</Link></li>
        <li><Link to="/servicos" onClick={fecharMenu}>Serviços</Link></li>
        <li><Link to="/contato" onClick={fecharMenu}>Contato</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;