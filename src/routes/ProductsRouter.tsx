import { Route, Routes } from "react-router-dom";
import { ProductEdit } from "../pages/Products/ProductEdit";
import { ProductIndex } from "../pages/Products/ProductIndex";
import { ProductNew } from "../pages/Products/ProductNew";

export function ProductsRouter() {
    return (
        <Routes>
            <Route path="/" element={<ProductIndex />}/>
            <Route path="/new" element={<ProductNew />}/>
            <Route path="/edit/:id" element={<ProductEdit />}/>
        </Routes>
    )
}