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

export function usePrices(company_id?: string) {
    const [prices, setPrices] = useState<IPrice[]>([])

    useEffect(()=>{
        if(company_id !== undefined){
            api.get(`/prices/find_by_company/${company_id}`).then(response => {
                setPrices(response.data)
            })
        }else {
            api.get('/prices').then(response => {
                setPrices(response.data)
            })
        }
    }, [company_id])

    return {prices, setPrices}
}   