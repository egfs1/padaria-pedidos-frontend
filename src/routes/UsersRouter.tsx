import { Route, Routes } from "react-router-dom";
import { UserEdit } from "../pages/User/UserEdit";
import { UserIndex } from "../pages/User/UserIndex";
import { UserNew } from "../pages/User/UserNew";

export function UsersRouter() {
    return (
        <Routes>
            <Route path="/" element={<UserIndex />}/>
            <Route path="/new" element={<UserNew />}/>
            <Route path="/:id" element={<UserEdit />}/>
        </Routes>
    )
}