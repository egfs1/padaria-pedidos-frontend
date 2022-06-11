import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface ISignIn {
    username: string
    password: string
}

interface IUser {
    username: string
    isAdmin: boolean
}

interface IAuthContext {
    isAuthenticated: boolean
    user: IUser | null
    signIn: (data : ISignIn) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: any){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('@SaborDoTrigo.accessToken')

        if (token){ 
            api.post('/me', {token}).then(response => {
                setUser(response.data)
                setIsAuthenticated(true)
                api.defaults.headers['Authorization'] = `Bearer ${token}`
            })
        }
    },[])

    async function signIn({ username, password } : ISignIn){
        const response = await api.post('/auth', {username, password})

        const {token, user} = response.data

        localStorage.setItem('@SaborDoTrigo.accessToken', token)

        setIsAuthenticated(true)
        setUser(user)

        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    function signOut(){
        localStorage.removeItem('@SaborDoTrigo.accessToken')

        setIsAuthenticated(false)
        setUser(null)

        api.defaults.headers['Authorization'] = ``
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}