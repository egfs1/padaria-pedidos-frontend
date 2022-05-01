import { Route, Routes } from "react-router-dom";
import { PriceIndex } from "../pages/Prices/PriceIndex";

export function PriceRouter() {
    return (
        <Routes>
            <Route path="/" element={<PriceIndex />}/>
        </Routes>
    )
}