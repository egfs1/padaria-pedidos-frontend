import { useEffect, useState } from "react"
import { api } from "../services/api"

interface ICompany {
    id: string
    name: string
}

export function useCompanies(){
    const [companies, setCompanies] = useState<ICompany[]>([])

    useEffect(()=> {
        api.get('/companies').then(response => {
            setCompanies(response.data)
        })
    }, [])

    return {companies, setCompanies}

}