import { useEffect, useState } from "react";
import { api } from "../services/api";

interface ICompany {
    id: string
    name: string
}

interface IProduct {
    id: string
    name: string
}


interface IPrice {
    id: string
    price: number
    company: ICompany
    product: IProduct
}

export function usePrice() {
    const [prices, setPrices] = useState<IPrice[]>([])

    useEffect(()=>{
        api.get('/prices').then(response => {
            setPrices(response.data)
        })
    }, [])

    return {prices, setPrices}
}   