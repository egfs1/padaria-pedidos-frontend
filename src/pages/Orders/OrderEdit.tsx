import { FormEvent, useEffect, useState } from "react"
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io"
import { useNavigate, useParams } from "react-router-dom"
import { usePrices } from "../../hooks/usePrices"
import { api } from "../../services/api"
import { IOrder } from "./OrderIndex"

interface ISubOrder {
    id?: string
    index?: number | undefined
    product_id: string
    product_price: number 
    quantity: string
}

export function OrderEdit(){
    const { id, company_id } = useParams()
    const navigate = useNavigate()
    const {prices: products} = usePrices(company_id)
    const [order, setOrder] = useState<IOrder | undefined>()
    const [subOrders, setSubOrders] = useState<ISubOrder[]>([])
    const [date, setDate] = useState('')
    
    useEffect(()=> {
        if(products !== undefined){
            api.get(`/orders/${id}`).then(response => {
                setOrder(response.data)

                const so = response.data.sub_orders as ISubOrder[]

                so.forEach(subOrder => {
                    if (!subOrder.product_price || subOrder.product_price===0){
                        subOrder.product_price = getProductPriceByProductId(subOrder.product_id)
                    }
                })

                setSubOrders(so)
                setDate(response.data.date.toString())
            })
        }
        // eslint-disable-next-line
    },[id, products])

    function getProductPriceByProductId(product_id: string){
        var product_price = 0
        for (const product of products){
            if(product.product.id === product_id){
                product_price = product.price
            }
        }

        return product_price
    }

    function setSubOrderIndexIfNotExist(subOrder: ISubOrder, key: number){
        const newArray = [...subOrders]
        newArray.forEach(newSubOrder => {
            if (newSubOrder.id === subOrder.id){
                newSubOrder.index = key
                setSubOrders(newArray)
                return newSubOrder.index
            }
        })
        return ''
    }

    function handleAddSubOrder(){
        const index = (subOrders[subOrders.length-1].index! + 1)
        setSubOrders([...subOrders,{index: index, product_id: products[0].product.id, product_price: products[0].price, quantity: ''}])
    }
    
    function handleDelete(index: number){
        const newArray = subOrders.filter((filteredSubOrder, _) => index !== filteredSubOrder.index)
        setSubOrders(newArray)
    }
    
    function onChangeProductId(index: number, product_id: string){

        const newArray = [...subOrders]
        newArray.forEach(subOrder => {
            if (subOrder.index === index){
                subOrder.product_id = product_id
                subOrder.product_price = getProductPriceByProductId(product_id)
            }
        })
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

    async function handleUpdateOrder(event: FormEvent){
        event.preventDefault()

        await api.put(`/orders/update/${order?.id}`, {subOrders, date})

        navigate(`/orders/company/${company_id}`)
    }

    function handleGoBack(){
        navigate(`/orders/company/${order?.company.id}`, {state: order?.company})
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Editar Pedido</h2>
                    <hr />
                    <button onClick={()=> handleGoBack()} className="btn btn-dark">Voltar</button>
                </div>
                <div className="card-body">
                    {order != undefined &&
                        <form onSubmit={handleUpdateOrder} id='form'  className="needs-validation" name="form" method="POST" action='/orders/save'>
                            <label>Empresa</label>
                            <select id="company_id" className="form-control" required>
                                    <option value={order.company.id}>{order.company.name}</option>
                            </select>
                            <div className="invalid-feedback">
                                Opção inválida
                            </div>
                            <label className="mt-2">Data</label>

                            <input  
                                id="date" className='form-control' type="date" min="2023-01-01" max="2023-12-31"
                                defaultValue={new Date(order.date).toISOString().split("T")[0]} 
                                onChange={event => setDate(new Date(event.target.value).toISOString())} 
                                required 
                            />

                            <div className="invalid-feedback">
                                Data inválida
                            </div>
                            <div id="suborders">
                                {subOrders.map((subOrder, key)=> {
                                    return(
                                        <div key={key} id={subOrder.index===undefined ? setSubOrderIndexIfNotExist(subOrder, key) : subOrder.index + ""}>
                                            <hr/>
                                            <div className="card-header">
                                                    <h4>Produto</h4>
                                                    <IoIosRemoveCircle size="42px" onClick={()=> handleDelete(subOrder.index!)} style={{float:"right", cursor: 'pointer', color: 'red'}}/>
                                            </div>
                                            <div className="card-body">
                                                <label>Produto </label>
                                                <select 
                                                name="product_id" 
                                                className="form-control"
                                                onChange={event => onChangeProductId( subOrder.index!, event.target.value)}
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
                                                onChange={event => onChangeQuantity(subOrder.index!, event.target.value)}
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
                            <button form="form" type="submit" className="btn btn-dark">Editar</button>
                        </form>
                    }
                </div>
            </div>
        </div>        
    )
}