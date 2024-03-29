import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface ISignIn {
    username: string
    password: string
}

export interface ISignUp {
    username: string
    password: string
    isAdmin: boolean
}

interface IUser {
    username: string
    isAdmin: boolean
}

interface IAuthContext {
    isAuthenticated: boolean
    user: IUser
    signUp: (data: ISignUp) => Promise<void>
    signIn: (data : ISignIn) => Promise<void>
    signOut: () => void
    errorMessage: string
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: any){

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem('@SaborDoTrigo.accessToken')

        if(token){
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            return true
        } else {
            return false
        }
    })

    const [user, setUser] = useState<IUser>()

    useEffect(()=> {
        const token = localStorage.getItem('@SaborDoTrigo.accessToken')
    
        if(token){
            api.post('/me', {token}).then(response => {
                setUser(response.data)
            })
        }
    },[])

    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    async function signUp({ username, password, isAdmin } : ISignUp){
        if(isAdmin){
            const response = await api.post('/users/create-admin', {username, password, isAdmin})

            const {token, user} = response.data
    
            localStorage.setItem('@SaborDoTrigo.accessToken', token)
    
            setIsAuthenticated(true)
            setUser(user)
    
            api.defaults.headers['Authorization'] = `Bearer ${token}`
        }

    }

    async function signIn({ username, password } : ISignIn){
        await api.post('/auth', {username, password}).then( function (response){
            const {token, user} = response.data

            localStorage.setItem('@SaborDoTrigo.accessToken', token)

            setIsAuthenticated(true)
            setUser(user)

            api.defaults.headers['Authorization'] = `Bearer ${token}`
        } ).catch(function (error) {
            if(error.response){
                setErrorMessage(error.response.data.message)
            }
        })
    }

    function signOut(){
        localStorage.removeItem('@SaborDoTrigo.accessToken')

        setIsAuthenticated(false)
        setUser(undefined)

        api.defaults.headers['Authorization'] = ``
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, user, signUp, signIn, signOut, errorMessage}}>
            {children}
        </AuthContext.Provider>
    )
}