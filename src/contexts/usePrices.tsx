import { useEffect, useState } from "react";
import { IPrice } from "../pages/Prices/PriceIndex";
import { api } from "../services/api";

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