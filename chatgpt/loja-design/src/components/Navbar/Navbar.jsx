import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">DesignStore</Link>
      </div>

      <nav className={`menu ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Vitrine</Link>
        <Link to="/servicos/1" onClick={() => setOpen(false)}>Serviços</Link>
        <Link to="/contato" onClick={() => setOpen(false)}>Contato</Link>
      </nav>

      <div
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>
    </header>
  )
}

export default Navbar
