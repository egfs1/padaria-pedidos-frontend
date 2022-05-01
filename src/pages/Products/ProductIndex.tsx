import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

interface IProduct {
    id: string
    name: string
}

export function ProductIndex(){
    const navigate = useNavigate()
    const [products, setProducts] = useState<IProduct[]>([])

    function handleEditProduct(product: IProduct){
        navigate(`/products/edit/${product.id}`, {state: product})
        
    }

    function handleDeleteProduct(product: IProduct){
        if(window.confirm(`Você tem certeza que deseja excluir o produto ${product.name}?`)){
            api.delete(`/products/delete/${product.id}`).then(() => {
                const newProducts = products.filter(product_filtered => product_filtered.id !== product.id)
                setProducts(newProducts)
    
            })
        }

    }

    useEffect(()=>{
        api.get('/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return (
        <div className="container-xl">
            <hr/>
            <div className="card-header">
                <h2>Produtos</h2>
                <hr/>
                <a className="btn btn-primary" href='/products/new'>Adicionar novo produto</a>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index)=> {
                        return (
                            <tr key={index}>
                                <th>{product.name}</th>
                                <th>
                                    <button onClick={()=> handleEditProduct(product)} className="btn btn-warning">Editar</button>
                                    <button onClick={()=> handleDeleteProduct(product)} className="btn btn-danger mx-1">Excluir</button>
                                </th>
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>        
    )
}