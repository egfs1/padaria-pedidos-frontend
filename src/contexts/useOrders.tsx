import { useEffect, useState } from "react"
import { IOrder } from "../pages/Orders/OrderIndex"
import { api } from "../services/api"

export function useOrders(company_id?: string){
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(()=> {
        if(company_id !== undefined){
            api.get(`/orders/company/${company_id}`).then(response => {
                setOrders(response.data)
            })
        } else {
            api.get('/orders').then(response => {
                setOrders(response.data)
            })
        }
    }, [])

    return {orders, setOrders}
}