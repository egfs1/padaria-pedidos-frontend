import { useEffect, useState } from "react";
import { IUser } from "../pages/User/UserIndex";
import { api } from "../services/api";

export function useUsers(){
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(()=>{
        api.get('/users').then(response => {
            setUsers(response.data)
        })
    }, [])

    return {users, setUsers}
}