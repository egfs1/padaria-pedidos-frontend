import { useContext } from 'react'
import { Navigate, RouteProps, } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

interface IRoute extends RouteProps {
    isRoutePrivate?: boolean
    isRouteAdmin?: boolean
}

export function CustomRoute({ isRoutePrivate = false, isRouteAdmin = false, children}: IRoute) {

    const { isAuthenticated, isAdmin} = useContext(AuthContext)

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    if(isRouteAdmin){
        if(isAdmin){
            return children as JSX.Element
        }
    } else {
        if(isRoutePrivate){
            return children as JSX.Element
        }
    }

    return <Navigate to="/orders" />

}

