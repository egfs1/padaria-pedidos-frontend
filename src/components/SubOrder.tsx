import { useEffect, useState } from "react"

interface IProduct {
    id: string
    name: string
}

interface ISubOrder {
    index: number
    product_id: string
    quantity: string
}

interface ISubOrderProps {
    index: number
    products: IProduct[],
    setSubOrder: (value: ISubOrder) => void
    removeSubOrder: (index: number) => void
    props: {
        product_id: string
        quantity: string
    }
}

export function SubOrder({index, products, props, setSubOrder, removeSubOrder}: ISubOrderProps){

    const [productId, setProductId] = useState<string>()
    const [quantity, setQuantity] = useState<string>()

    useEffect(()=> {
        if(productId==undefined){
            setProductId(props.product_id)
            setQuantity(props.quantity)
            if(productId==undefined){
                setProductId(products[0].id)
            }
            setSubOrder({index, product_id: props.product_id, quantity: props.quantity} as ISubOrder)
        }else {
            setSubOrder({index, product_id: productId, quantity} as ISubOrder)
        }

    },[productId,quantity])

    function handleDelete(index: number){
        removeSubOrder(index)
    }

    return(
        <div id={index + ''}>
            <hr/>
            <div className="card-header">
                    <h4>Produto</h4>
                    <a onClick={()=> handleDelete(index)} className="btn btn-danger rounded-circle" style={{float:"right"}}>x</a>
            </div>
            <div className="card-body">
                <label>Produto </label>
                <select 
                name="product_id" 
                className="form-control"
                onChange={event => setProductId(event.target.value)}
                required>
                    {products.map((product, productKey)=> {
                        return (
                            <option key={productKey} value={product.id}>{product.name}</option>
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
                onChange={event => setQuantity(event.target.value)}
                value={quantity}
                step=".01" 
                required />
                <div className="invalid-feedback">
                    Quantidade inválida
                </div>
            </div>
        </div>
    )
}