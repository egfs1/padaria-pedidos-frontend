import { useNavigate, useParams } from "react-router-dom"
import { useOrders } from "../../contexts/useOrders"
import { api } from "../../services/api"
import { FiTrash, FiEdit, FiPlus } from "react-icons/fi"
import { Button } from "../../components/Button"
import { ICompany } from "../Companies/CompanyIndex"
import { IOrder } from "./OrderIndex"
import { getAllMonths } from "../../contexts/useMonths"
import { useEffect, useState } from "react"

export function OrderCompany(){
    const { company_id } = useParams()
    const navigate = useNavigate()
    const {orders, setOrders} = useOrders(company_id)
    const months = getAllMonths()
    const [company, setCompany] = useState<ICompany | undefined>()

    useEffect(()=> {
        api.get(`/companies/${company_id}`).then(response => {
            setCompany(response.data)
        })
    }, [company_id])
    
    function handleQuantitative(month: string){
        navigate(`/orders/quantitative/${company_id}/${month}`)
    }

    function handleNewOrder(){
        navigate(`/orders/${company_id}/new`)
    }

    function handleEditOrder(order: IOrder){
        navigate(`/orders/${company_id}/${order.id}`)
    }

    function handleDeleteOrder(order: IOrder){
        if(window.confirm(`Você tem certeza que deseja excluir o pedido do dia ${order.date} da empresa ${company?.name}?`)){
            api.delete(`/orders/delete/${order.id}`).then(() => {
                const newPrices = orders.filter(order_filtered => order_filtered.id !== order.id)
                setOrders(newPrices)
            })
        }
    }

    function handleGoBack(){
        navigate(`/orders`)
    }

    return (
        <div className="container-xl">
            <hr/>
            <div className="card-header">
                <h2>{company?.name}</h2>
                <hr />
                <button onClick={()=> handleGoBack()} className="btn btn-primary">Voltar</button>
            </div>
            {months.map((month,monthKey)=> {
                return (
                    <div key={monthKey}>
                        <div className="card mt-4">
                            <div className="card-header">
                                <div className="row">
                                    <h4>{month.name}</h4>
                                    <hr/>
                                    <div className="col col-12">
                                        <div className="quantitative">
                                            <button onClick={()=> handleQuantitative(month.numberAsString)} className="btn btn-primary" style={{float:"left"}}>Quantitativo</button>
                                        </div>
                                        <div className="new-order">
                                            <Button onClick={()=> handleNewOrder()} type="btn-primary rounded-circle" icon={<FiPlus />} style={{float:"right", height: "42px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Empresa</th>
                                    <th>Data</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orders.map((order, orderKey) => {
                                    if(new Date(order.date).toLocaleDateString('pt-BR', {timeZone: 'UTC', month: '2-digit'}) === month.numberAsString){
                                        return (
                                            <tr key={orderKey}>
                                                <th>{company?.name}</th>
                                                <th>{new Date(order.date).toLocaleDateString('pt-BR', {timeZone: 'UTC', month: '2-digit', day: '2-digit'})}</th>
                                                <th>{order.value.toFixed(2)}</th>
                                                <th>
                                                    <Button text="Editar" type="btn-warning mb-1 px-2" icon={<FiEdit />} onClick={()=>  handleEditOrder(order)}/>
                                                    <Button text="Excluir" type="btn-danger mb-1 px-2" icon={<FiTrash />} onClick={()=> handleDeleteOrder(order)}/>
                                                </th>
                                            </tr>
                                        )
                                    }
                                    return null
                                })}
                            </tbody>
                        </table>                        
                    </div>
                )
            })}
                
</div>        
    )
}