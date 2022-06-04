import { FormEvent, useEffect, useState,} from "react"
import { useNavigate, useParams} from "react-router-dom"
import { api } from "../../services/api"
import { IProduct } from "./ProductIndex"

export function ProductEdit(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<IProduct | undefined>()

    useEffect(()=> {
        api.get(`/products/${id}`).then(response => {
            setProduct(response.data)
        })
    },[id])

    async function handleUpdateProduct(event: FormEvent){
        event.preventDefault()

        const name = (document.getElementById('name') as HTMLInputElement).value
        
        await api.put(`/products/update/${product?.id}`, {name: name})

        navigate('/products')

    }

    return (
        <div className="container">
            <hr/>
            <div className="card">
                <div className="card-header">
                    <h2>Editar Produto</h2>
                </div>
                <div className="card-body">
                    <form className="needs-validation" method="POST" onSubmit={handleUpdateProduct}>
                        <input className='form-control' 
                        type="text" 
                        id="name"
                        defaultValue={product?.name}
                        placeholder={product?.name} 
                        required/>
                        <button className="btn btn-primary mt-4">Editar</button>
                    </form>
                </div>
            </div>
        </div>        
    )
}