import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompanyRouter } from "./companyRouter";
import { ProductRouter } from "./productRouter";

export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products/*"  element={<ProductRouter />}/>
                <Route path="/companies/*" element={<CompanyRouter />}/>
            </Routes>
        </BrowserRouter>
    )
}