import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { useProducts } from "../../hooks/useProducts"
import { api } from "../../services/api"
import { FiTrash, FiEdit } from "react-icons/fi"

export interface IProduct {
    id: string
    name: string
}

export function ProductIndex(){
    const navigate = useNavigate()
    const {products, setProducts} = useProducts()
    
    function handleEditProduct(product: IProduct){
        navigate(`/products/${product.id}`)
    }

    async function handleDeleteProduct(product: IProduct){
        if(window.confirm(`Você tem certeza que deseja excluir o produto ${product.name}?`)){
            api.delete(`/products/delete/${product.id}`).then(() => {
                const newProducts = products.filter(product_filtered => product_filtered.id !== product.id)
                setProducts(newProducts)
    
            })
        }
    }

    function handleNewProduct(){
        navigate(`/products/new`)
    }

    return (
        <div className="container-xl">
            <div className="card-header">
                <h2>Produtos</h2>
                <hr/>
                <button className="btn btn-dark" onClick={handleNewProduct}>Adicionar novo produto</button>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, key)=> {
                        return (
                            <tr key={key}>
                                <th>{product.name}</th>
                                <th>
                                    <Button text="Editar" type="btn-warning mx-1 mb-1" icon={<FiEdit />} onClick={()=> handleEditProduct(product)}/>
                                    <Button text="Excluir" type="btn-danger mx-1 mb-1" icon={<FiTrash />} onClick={()=> handleDeleteProduct(product)}/>
                                </th>
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>        
    )
}