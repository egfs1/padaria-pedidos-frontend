import { Route, Routes } from "react-router-dom";
import { OrderCompany } from "../pages/Orders/OrderCompany";
import { OrderEdit } from "../pages/Orders/OrderEdit";
import { OrderIndex } from "../pages/Orders/OrderIndex";
import { OrderNew } from "../pages/Orders/OrderNew";

export function OrdersRouter(){
    return (
        <Routes>
            <Route path="/" element={<OrderIndex />}/>
            <Route path="/new" element={<OrderNew />}/>
            <Route path="/:id" element={<OrderEdit />}/>
            <Route path="/company/:company_id" element={<OrderCompany />}/>
        </Routes>
    )
}