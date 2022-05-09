import { useNavigate } from "react-router-dom"
import { useCompanies } from "../../contexts/useCompanies"
import { useOrders } from "../../contexts/useOrders"
import { api } from "../../services/api"
import { FiTrash, FiEdit, FiPlus } from "react-icons/fi"
import { Button } from "../../components/Button"
import { ICompany } from "../Companies/CompanyIndex"

interface ISubOrder {
    id: string
    product_id: string
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
    const {orders, setOrders} = useOrders()
    const {companies} = useCompanies()

    function handleQuantitative(){

    }

    function handleNewOrder(company: ICompany){
        navigate('/orders/new', {state: company})
    }

    function handleEditOrder(order: IOrder){
        navigate(`/orders/edit/${order.id}`, {state: order})
        
    }

    function handleDeleteOrder(order: IOrder){
        if(window.confirm(`Você tem certeza que deseja excluir o pedido do dia ${order.date} da empresa ${order.company.name}?`)){
            api.delete(`/orders/delete/${order.id}`).then(() => {
                const newPrices = orders.filter(order_filtered => order_filtered.id !== order.id)
                setOrders(newPrices)
            })
        }
    }

    return (
        <div className="container-xl">
            <hr/>
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
                                    <div className="col col-12">
                                        <div className="quantitative">
                                            <button onClick={()=> handleQuantitative()} className="btn btn-primary" style={{float:"left"}}>Quantitativo</button>
                                            <select style={{width:"auto", float: "left"}} className="form-select mx-2" name="month">
                                                <option value="1">Janeiro</option>
                                                <option value="2">Fevereiro</option>
                                                <option value="3">Março</option>
                                                <option value="4">Abril</option>
                                                <option value="5">Maio</option>
                                                <option value="6">Junho</option>
                                                <option value="7">Julho</option>
                                                <option value="8">Agosto</option>
                                                <option value="9">Setembro</option>
                                                <option value="10">Outubro</option>
                                                <option value="11">Novembro</option>
                                                <option value="12">Dezembro</option>
                                            </select> 
                                        </div>
                                        <div className="new-order">
                                            <Button onClick={()=> handleNewOrder(company)} type="btn-primary rounded-circle" icon={<FiPlus />} style={{float:"right", height: "42px"}}/>
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
                                    if(order.company.name === company.name){
                                        return (
                                            <tr key={orderKey}>
                                                <th>{order.company.name}</th>
                                                <th>{new Date(order.date).toLocaleDateString('pt-BR', {timeZone: 'UTC', year: '2-digit', month: '2-digit', day: '2-digit'})}</th>
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