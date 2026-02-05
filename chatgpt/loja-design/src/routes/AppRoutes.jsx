import { BrowserRouter, Routes, Route} from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout.jsx"

import Home from "../pages/Home/Home.jsx"
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx"
import Services from "../pages/Services/Services.jsx"
import Payment from "../pages/Payment/Payment.jsx";
import Checkout from "../pages/Checkout/Checkout"
import Contact from "../pages/Contact/Contact"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/produto/:id" element={<ProductDetails />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/pagamento" element={<Payment />} />
                    <Route path="/checkout" element={<Checkout />} />
                    {/*<Route path="/contato" element={<Checkout />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes