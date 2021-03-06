import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMonth } from "../../hooks/useMonths"
import { api } from "../../services/api"
import { ICompany } from "../Companies/CompanyIndex"

interface IQuantitative {
    product: string,
    quantity: number,
    value: number
}

export function OrderQuantitative() {

    const { company_id, monthString } = useParams()
    const month = getMonth(monthString!)
    const [company, setCompany] = useState<ICompany | undefined>()
    const [quantitatives, setQuantitatives] = useState<IQuantitative[] | undefined>()
    const [daysLeft, setDaysLeft] = useState<string[]>([])

    useEffect(()=> {
        api.get(`/companies/${company_id}`).then(response => {
            setCompany(response.data)
        })
    }, [company_id])

    useEffect(()=> {
        api.get(`/orders/quantitative/${company_id}/${month?.numberAsNumber}`).then(response=> {
            setQuantitatives(response.data[0])
            setDaysLeft(response.data[1])
        })
    },[company_id,month])

    return (
    <div className="container-xl">
        <div className="card-header">
            <h2>{company?.name}</h2>
            <hr />
            <h4>{month?.name}</h4>
        </div>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {quantitatives?.map((quantitative, quantitativeKey) => {
                    return (
                        <tr key={quantitativeKey}>
                            <th>{quantitative.product}</th>
                            <th>{quantitative.quantity}</th>
                            <th>{quantitative.value.toFixed(2)}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <p className="text-center fst-italic fs-6 fw-bold text-break mx-4" style={{color: 'black'}}>Dias Faltando: {daysLeft.toString()}</p>
    </div>  
    )
}