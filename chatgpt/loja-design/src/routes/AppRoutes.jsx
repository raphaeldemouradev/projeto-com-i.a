import { BrowserRouter, Routes, Route} from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout.jsx"

import Home from "../pages/Home/Home.jsx"
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx"
import Services from "../pages/Services/Services.jsx"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/produto/:id" element={<ProductDetails />} />
                    <Route path="servicos/:id" element={<Services />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes