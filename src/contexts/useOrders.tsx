import { useEffect, useState } from "react"
import { IOrder } from "../pages/Orders/OrderIndex"
import { api } from "../services/api"

export function useOrders(){
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(()=> {
        api.get('/orders').then(response => {
            setOrders(response.data)
        })
    }, [])

    return {orders, setOrders}
}