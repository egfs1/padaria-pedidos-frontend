import { useNavigate } from "react-router-dom"
import { useCompanies } from "../../hooks/useCompanies"
import { SiAddthis } from 'react-icons/si'
import { Button } from "../../components/Button"
import { ICompany } from "../Companies/CompanyIndex"

interface ISubOrder {
    id?: string
    product_id: string
    product_price?: number 
    quantity: string
}

export interface IOrder {
    id: string
    company: ICompany
    date: Date
    value: number
    sub_orders: ISubOrder[]
}

export function OrderIndex(){
    const navigate = useNavigate()
    const { companies } = useCompanies()

    function handleNewOrder(company: ICompany){
        navigate(`/orders/${company.id}/new`)
    }

    function handleShowOrdersByCompany(company: ICompany){
        navigate(`/orders/company/${company.id}`)
    }

    return (
        <div className="container-xl">
            <div className="card-header">
                <h2>Pedidos</h2>
            </div>
            {companies.map((company,companiesKey)=> {
                return (
                    <div key={companiesKey}>
                        <div className="card mt-4">
                            <div className="card-header">
                                <div className="row">
                                    <h4>{company.name}</h4>
                                    <hr/>
                                    <div className="col col-12" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <div className="show-orders-by-company">
                                            <Button onClick={()=> handleShowOrdersByCompany(company)} text="Ver Pedidos" type="btn-dark" style={{float:"left", height: "42px"}}/>
                                        </div>

                                        <div className="new-order">
                                            <SiAddthis size="32px" onClick={()=> handleNewOrder(company)} style={{cursor: 'pointer'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                     
                    </div>
                )
            })}
                
</div>        
    )
}