import { Route, Routes } from "react-router-dom";
import { PriceEdit } from "../pages/Prices/PriceEdit";
import { PriceIndex } from "../pages/Prices/PriceIndex";
import { PriceNew } from "../pages/Prices/PriceNew";

export function PriceRouter() {
    return (
        <Routes>
            <Route path="/" element={<PriceIndex />}/>
            <Route path="/new" element={<PriceNew />}/>
            <Route path="/edit/:id" element={<PriceEdit />}/>
        </Routes>
    )
}