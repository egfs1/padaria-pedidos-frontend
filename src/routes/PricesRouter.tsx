import { Route, Routes } from "react-router-dom";
import { PriceEdit } from "../pages/Prices/PriceEdit";
import { PriceIndex } from "../pages/Prices/PriceIndex";
import { PriceNew } from "../pages/Prices/PriceNew";

export function PricesRouter() {
    return (
        <Routes>
            <Route path="/" element={<PriceIndex />}/>
            <Route path="/:company_id/new" element={<PriceNew />}/>
            <Route path="/:id" element={<PriceEdit />}/>
        </Routes>
    )
}