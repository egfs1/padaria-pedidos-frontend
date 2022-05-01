import { Route, Routes } from "react-router-dom";
import { CompanyEdit } from "../pages/Companies/CompanyEdit";
import { CompanyIndex } from "../pages/Companies/CompanyIndex";
import { CompanyNew } from "../pages/Companies/CompanyNew";

export function CompanyRouter() {
    return (
        <Routes>
            <Route path="/" element={<CompanyIndex />}/>
            <Route path="/new" element={<CompanyNew />}/>
            <Route path="/edit/:id" element={<CompanyEdit />}/>
        </Routes>
    )
}