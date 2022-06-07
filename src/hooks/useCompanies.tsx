import { useEffect, useState } from "react"
import { ICompany } from "../pages/Companies/CompanyIndex"
import { api } from "../services/api"

export function useCompanies(){
    const [companies, setCompanies] = useState<ICompany[]>([])

    useEffect(()=> {
        api.get('/companies').then(response => {
            setCompanies(response.data)
        })
    }, [])

    return {companies, setCompanies}

}