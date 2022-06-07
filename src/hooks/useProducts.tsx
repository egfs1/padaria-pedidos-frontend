import { useEffect, useState } from "react";
import { IProduct } from "../pages/Products/ProductIndex";
import { api } from "../services/api";

export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(()=>{
        api.get('/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return {products, setProducts}
}