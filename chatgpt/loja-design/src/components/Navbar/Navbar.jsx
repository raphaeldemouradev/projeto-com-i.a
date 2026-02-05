import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="navbar">
        <h1 className="logo">DesignStore</h1>

        {/* MENU DESKTOP */}
        <nav className="nav-desktop">
          <Link to="/">Vitrine</Link>
          <Link to="/services">Serviços</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </header>

      {/* OVERLAY MOBILE */}
      <div className={`menu-overlay ${open ? "open" : ""}`}>
        <aside className={`menu-mobile ${open ? "open" : ""}`}>
          
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>

          <nav className="menu-links">
            <Link to="/" onClick={() => setOpen(false)}>
              Vitrine
            </Link>
            <Link to="/services" onClick={() => setOpen(false)}>
              Serviços
            </Link>
            <Link to="/contato" onClick={() => setOpen(false)}>
              Contato
            </Link>
          </nav>

        </aside>
      </div>
    </>
  )
}

export default Navbar
