import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*components*/ 
import Navbar from './components/Navbar/Navbar';
import Service from './components/service-pag/Service';
import Catalogo from './components/catalogo-pag/Catalogo';
import Detalhes from './components/detalhes/Detalhes';
import Contato from './components/contato-pag/Contato';

/*estilo*/
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="conteudo-principal">
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/servicos" element={<Service />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </div>
      </Router>

      <footer>
        <p>© 2026 <a href="https://github.com/raphaeldemouradev">Raphael.Dev</a> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;