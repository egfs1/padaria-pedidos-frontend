import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface ISignIn {
    username: string
    password: string
}

interface IAuthContext {
    isAuthenticated: boolean
    isAdmin: boolean
    signIn: (data : ISignIn) => Promise<void>
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: any){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('@SaborDoTrigo.accessToken')
        const isAdmin = localStorage.getItem('@SaborDoTrigo.isAdmin')

        if (token){
            setIsAuthenticated(true)
            if(isAdmin === "true"){
                setIsAdmin(true)
            }else {
                setIsAdmin(false)
            }
            api.defaults.headers['Authorization'] = `Bearer ${token}`
        }

    },[])

    async function signIn({ username, password } : ISignIn){
        const response = await api.post('/auth', {username, password})

        const {token, isAdmin} = response.data

        localStorage.setItem('@SaborDoTrigo.accessToken', token)
        localStorage.setItem('@SaborDoTrigo.isAdmin', isAdmin)

        setIsAuthenticated(true)
        setIsAdmin(isAdmin)

        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, isAdmin, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}