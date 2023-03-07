import { FormEvent} from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export function ProductNew(){
    const navigate = useNavigate()

    async function handleSendProduct(event: FormEvent){
        event.preventDefault()

        const name = (document.getElementById('name') as HTMLInputElement).value

        await api.post('/products/save', {name: name})
        
        navigate('/products')
    }

    function handleReturn(){
        navigate('/products')
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Novo produto</h2>
                    <hr/>
                    <button onClick={()=> handleReturn()} className="btn btn-dark">Voltar</button>
                </div>
                <div className="card-body">
                    <form method="POST" onSubmit={handleSendProduct} className="needs-validation">
                        <input className='form-control' 
                        type="text" 
                        id='name' 
                        placeholder='Nome do produto'
                        required />
                        <button type="submit" className="btn btn-dark mt-4">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>                 
    )
}