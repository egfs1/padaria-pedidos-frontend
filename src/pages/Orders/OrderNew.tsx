import { FormEvent, ReactNode, useEffect, useState } from "react"
import { FiPlus, FiX } from "react-icons/fi"
import { useLocation } from "react-router-dom"
import { Button } from "../../components/Button"
import { usePrices } from "../../contexts/usePrices"
import { api } from "../../services/api"
import { ICompany } from "../Companies/CompanyIndex"

interface ILocationState {
    state: ICompany
}

export interface ISubOrder {
    index: number
    product_id: string
    quantity: string
}

var numeration = 0
export function OrderNew(){
    
    const location = useLocation()
    const {state: company} = location as ILocationState
    const {prices: products} = usePrices(company.id)
    const [subOrders, setSubOrders] = useState<ISubOrder[]>([])

    function handleDelete(index: number){
        const newArray = subOrders.filter((filteredSubOrder, _) => index !== filteredSubOrder.index)
        setSubOrders(newArray)
    }

    function getDate(){
        var date = new Date()
        var dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
        var string = dateUTC.toISOString().split('T')[0]
        return string
    }

    async function handleSendOrder(event: FormEvent){
        event.preventDefault()
        
        const product_id: string[] = []
        const quantity: number[] = []
        const date =  new Date((document.getElementById('date') as HTMLInputElement).value)

        subOrders.forEach(subOrder => {
            product_id.push(subOrder.product_id)
            console.log(subOrder.product_id)
            quantity.push(parseFloat(subOrder.quantity))
        })

        await api.post('/orders/save', {company_id: company.id, date: date, product_id, quantity})
        
        window.location.reload()
    }

    function handleAddSubOrder(){
        setSubOrders([...subOrders,{index: numeration, product_id: products[0].product.id, quantity: ''}])
        numeration++
    }
    
    function onChangeProductId(index: number, product_id: string){
        const newArray = [...subOrders]
        newArray.forEach(subOrder => {
            if (subOrder.index == index){
                subOrder.product_id = product_id
            }
        })
        setSubOrders(newArray)
    }

    function onChangeQuantity(index: number, quantity: string){
        const newArray = [...subOrders]
        newArray.forEach(subOrder => {
            if (subOrder.index == index){
                subOrder.quantity = quantity
            }
        })
        setSubOrders(newArray)
    }

    return (
        <div className="container">
            <hr/>
            <div className="card">
                <div className="card-header">
                    <h2>Novo Pedido</h2>
                </div>
                <div className="card-body">
                    <form id='form' onSubmit={handleSendOrder}  className="needs-validation" name="form" method="POST" action='/orders/save'>
                        <label>Empresa</label>
                        <select id="company_id" className="form-control" required>
                                <option value={company.id}>{company.name}</option>
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-2">Data</label>
                        <input  id="date" className='form-control' type="date" min="2022-01-01" max="2022-12-31" defaultValue={getDate()}  required />
                        <div className="invalid-feedback">
                            Data inválida
                        </div>
                        <div id="suborders">
                            {subOrders.map((subOrder, key)=> {
                                return(
                                    <div key={key} id={subOrder.index + ''}>
                                        <hr/>
                                        <div className="card-header">
                                                <h4>Produto</h4>
                                                <Button onClick={()=> handleDelete(subOrder.index)} type="btn-danger rounded-circle" icon={<FiX />} style={{float:"right", height: "42px"}}/>
                                        </div>
                                        <div className="card-body">
                                            <label>Produto </label>
                                            <select 
                                            name="product_id" 
                                            className="form-control"
                                            onChange={event => onChangeProductId( subOrder.index, event.target.value)}
                                            value={subOrder.product_id}
                                            required>
                                                {products.map((product, productKey)=> {
                                                    return (
                                                        <option key={productKey} value={product.product.id}>{product.product.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <div className="invalid-feedback">
                                                Produto inválido
                                            </div>
                                            <label className="mt-4">Quantidade</label>
                                            <input 
                                            name="quantity" 
                                            type="number"
                                            className="form-control"
                                            onChange={event => onChangeQuantity(subOrder.index, event.target.value)}
                                            value={subOrder.quantity}
                                            step=".01" 
                                            required />
                                            <div className="invalid-feedback">
                                                Quantidade inválida
                                            </div>
                                        </div>
                                    </div>                                    
                                )
                            })}
                        </div>
                        <div className="row">
                            <div className="col col-12">
                                <Button onClick={handleAddSubOrder} type="btn-primary rounded-circle mt-3" icon={<FiPlus />} style={{float:"right", height: "42px"}}/>
                            </div>
                        </div>
                        <hr/>
                        <button form="form" type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>        
    )
}