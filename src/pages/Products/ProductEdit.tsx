import { FormEvent,} from "react"
import { useLocation, useNavigate, useParams} from "react-router-dom"
import { api } from "../../services/api"

interface Product {
    id: string
    name: string
}

interface LocationState {
    state: Product
}

export function ProductEdit(){
    const location = useLocation()
    const navigate = useNavigate()
    const {state: product} = location as LocationState
    const {id} = useParams()

    async function handleUpdateProduct(event: FormEvent){
        event.preventDefault()

        const name = (document.getElementById('name') as HTMLInputElement).value
        
        await api.put(`/products/update/${id}`, {name: name})

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
                        name='name'
                        id="name"
                        defaultValue={product.name}
                        placeholder={product?.name} required/>
                        <div className="invalid-feedback">
                            Nome inválido
                        </div>
                        <button className="btn btn-primary mt-4">Editar</button>
                    </form>
                </div>
            </div>
        </div>        
    )
}