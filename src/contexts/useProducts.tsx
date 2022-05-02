import { useEffect, useState } from "react";
import { api } from "../services/api";

interface IProduct {
    id: string
    name: string
}

export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(()=>{
        api.get('/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return {products, setProducts}
}