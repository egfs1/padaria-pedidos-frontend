import { Route, Routes } from "react-router-dom";
import { OrderCompany } from "../pages/Orders/OrderCompany";
import { OrderEdit } from "../pages/Orders/OrderEdit";
import { OrderIndex } from "../pages/Orders/OrderIndex";
import { OrderNew } from "../pages/Orders/OrderNew";
import { OrderQuantitative } from "../pages/Orders/OrderQuantitative";

export function OrdersRouter(){

    return (
        <Routes>
            <Route path="/" element={<OrderIndex />}/>
            <Route path="/:company_id/new" element={<OrderNew />}/>
            <Route path="/:company_id/:id" element={<OrderEdit />}/>
            <Route path="/company/:company_id" element={<OrderCompany />}/>
            <Route path="/quantitative/:company_id/:monthString" element={<OrderQuantitative />}/>
        </Routes>
    )
}