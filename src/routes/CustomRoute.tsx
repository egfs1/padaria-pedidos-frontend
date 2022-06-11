import { useContext } from 'react'
import { Navigate, RouteProps, } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'

interface IRoute extends RouteProps {
    isRoutePrivate?: boolean
    isRouteAdmin?: boolean
}

export function CustomRoute({ isRoutePrivate = false, isRouteAdmin = false, children}: IRoute) {

    const { isAuthenticated, user } = useContext(AuthContext)

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    if(isRouteAdmin){
        if(user.isAdmin){
            return (
                <NavBar>
                    {children}
                </NavBar>
                )
        }
    } else {
        if(isRoutePrivate){
            return (
                <NavBar>
                    {children}
                </NavBar>
                )
        }
    }

    return <Navigate to="/orders" />

}

