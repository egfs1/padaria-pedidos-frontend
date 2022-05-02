import { useEffect, useState } from "react"
import { api } from "../services/api"

interface ICompany {
    id: string
    name: string
}

interface IOrder {
    id: string
    company: ICompany
    date: Date,
    value: number
}

export function useOrders(){
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(()=> {
        api.get('/orders').then(response => {
            setOrders(response.data)
        })
    }, [])

    return {orders, setOrders}
}