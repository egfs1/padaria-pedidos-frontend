import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AdminSignUp } from "../pages/User/AdminSignUp";
import { SignIn } from "../pages/User/SignIn";
import { PrivateRoutes } from "./PrivateRoutes";

export function Router(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignIn />}/>
                <Route path="/admin-signup" element={<AdminSignUp />}/>
                <Route path='/*' element={<PrivateRoutes/>}/>
            </Routes>
        </BrowserRouter>
    )
}