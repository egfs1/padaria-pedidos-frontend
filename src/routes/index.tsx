import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompaniesRouter } from "./CompaniesRouter";
import { OrdersRouter } from "./OrdersRouter";
import { PricesRouter } from "./PricesRouter";
import { ProductsRouter } from "./ProductsRouter";

export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products/*"  element={<ProductsRouter />}/>
                <Route path="/companies/*" element={<CompaniesRouter />}/>
                <Route path="/prices/*" element={<PricesRouter />}/>
                <Route path="/orders/*" element={<OrdersRouter />}/>
            </Routes>
        </BrowserRouter>
    )
}