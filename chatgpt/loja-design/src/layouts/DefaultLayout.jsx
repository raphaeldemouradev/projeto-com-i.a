import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer>
        <p>© 2026 <a href="https://github.com/raphaeldemouradev">Raphael.Dev</a> - Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default DefaultLayout