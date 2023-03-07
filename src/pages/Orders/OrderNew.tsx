import { FormEvent, useEffect, useState } from "react"
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io'
import { useNavigate, useParams } from "react-router-dom"
import { usePrices } from "../../hooks/usePrices"
import { api } from "../../services/api"
import { ICompany } from "../Companies/CompanyIndex"

interface ISubOrder {
    index: number
    product_id: string
    product_price: number
    quantity: string
}

var numeration = 0
export function OrderNew(){
    const { company_id } = useParams()
    const navigate = useNavigate()
    const {prices: products} = usePrices(company_id)
    const [subOrders, setSubOrders] = useState<ISubOrder[]>([])
    const [company, setCompany] = useState<ICompany | undefined>()

    useEffect(()=> {
        api.get(`/companies/${company_id}`).then(response => {
            setCompany(response.data)
        })
    },[company_id])

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
        const product_price: number[] = []
        const quantity: number[] = []
        const date =  new Date((document.getElementById('date') as HTMLInputElement).value)

        subOrders.forEach(subOrder => {
            product_id.push(subOrder.product_id)
            product_price.push(subOrder.product_price)
            quantity.push(parseFloat(subOrder.quantity))
        })

        const alreadyExistsOrderOfThisCompanyToday = await api.post('/orders/exists', { company_id, date })

        if(alreadyExistsOrderOfThisCompanyToday){
            if(!window.confirm(`Você ja criou um pedido pra essa empresa hoje, deseja criar outro?`)){
                return
            }
        }

        await api.post('/orders/save', {company_id: company?.id, date: date, product_id, product_price, quantity})

        await api.post('/logs/save', { type: "CREATE_ORDER", message: `PEDIDO CRIADO PARA A EMPRESA '${company.name}' EM ${date.toLocaleString("pt-BR", { timeZone: "UTC"})}`})
        
        window.location.reload()
    }

    function handleAddSubOrder(){
        setSubOrders([...subOrders,{index: numeration, product_id: products[0].product.id, product_price: products[0].price, quantity: ''}])
        numeration++
    }

    function getProductPriceByProductId(product_id: string){
        var product_price = 0
        for (const product of products){
            if(product.product.id === product_id){
                product_price = product.price
            }
        }

        return product_price
    }
    
    function onChangeProductId(index: number, product_id: string){
        const newArray = [...subOrders]
        const product_price = getProductPriceByProductId(product_id)

        for (const subOrder of newArray){
            if (subOrder.index === index){
                subOrder.product_id = product_id
                subOrder.product_price = product_price
            }
        }

        setSubOrders(newArray)
    }

    function onChangeQuantity(index: number, quantity: string){
        const newArray = [...subOrders]
        newArray.forEach(subOrder => {
            if (subOrder.index === index){
                subOrder.quantity = quantity
            }
        })
        setSubOrders(newArray)
    }

    function handleReturn(){
        navigate(`/orders/company/${company?.id}`, {state: company})
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Novo Pedido</h2>
                    <hr />
                    <button onClick={()=> handleReturn()} className="btn btn-dark">Voltar</button>
                </div>
                <div className="card-body">
                    <form id='form' onSubmit={handleSendOrder}  className="needs-validation" name="form" method="POST" action='/orders/save'>
                        <label>Empresa</label>
                        <select id="company_id" className="form-control" required>
                                <option value={company?.id}>{company?.name}</option>
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-2">Data</label>
                        <input  id="date" className='form-control' type="date" min="2023-01-01" max="2023-12-31" defaultValue={getDate()}  required />
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
                                                <IoIosRemoveCircle size="42px" onClick={()=> handleDelete(subOrder.index)} style={{float:"right", cursor: 'pointer', color: 'red'}}/>
                                        </div>
                                        <div className="card-body">
                                            <label>Produto </label>
                                            <select 
                                            name="product" 
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
                                <IoIosAddCircle size="42px" className="mt-3" onClick={handleAddSubOrder} style={{float:"right", cursor: 'pointer'}}/>
                            </div>
                        </div>
                        <hr/>
                        <button form="form" type="submit" className="btn btn-dark">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>        
    )
}