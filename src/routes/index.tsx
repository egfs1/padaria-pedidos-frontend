import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompanyRouter } from "./companyRouter";
import { PriceRouter } from "./priceRouter";
import { ProductRouter } from "./productRouter";

export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products/*"  element={<ProductRouter />}/>
                <Route path="/companies/*" element={<CompanyRouter />}/>
                <Route path="/prices/*" element={<PriceRouter />}/>
            </Routes>
        </BrowserRouter>
    )
}