import { Route, Routes } from "react-router-dom";
import { OrderIndex } from "../pages/Orders/OrderIndex";

export function OrdersRouter(){
    return (
        <Routes>
            <Route path="/" element={<OrderIndex />}/>

        </Routes>
    )
}