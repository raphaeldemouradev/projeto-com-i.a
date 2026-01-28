import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default DefaultLayout