import { Route, Routes } from "react-router-dom";
import { OrderIndex } from "../pages/Orders/OrderIndex";
import { OrderNew } from "../pages/Orders/OrderNew";

export function OrdersRouter(){
    return (
        <Routes>
            <Route path="/" element={<OrderIndex />}/>
            <Route path="/new" element={<OrderNew />}/>
        </Routes>
    )
}