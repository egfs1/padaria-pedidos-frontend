import { FormEvent } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import { api } from "../../services/api"

interface ICompany {
    id: string
    name: string
}

interface IProduct {
    id: string
    name: string
}

interface IPrice {
    id: string
    price: number
    company: ICompany
    product: IProduct
}

interface ILocationState {
    state: IPrice
}

export function PriceEdit(){

    const navigate = useNavigate()
    const location = useLocation()
    const {state: price} = location as ILocationState

    async function handleUpdatePrice(event: FormEvent){
        event.preventDefault()

        const _price = (document.getElementById('price') as HTMLInputElement).value
        
        await api.put(`/prices/update/${price.id}`, {price: _price})

        navigate('/prices')

    }

    return (
        <div className="container">
            <hr/>
            <div className="card">
                <div className="card-header">
                    <h2>Novo Preço</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdatePrice}  method="POST" className="needs-validation">
                        <label>Empresa</label>
                        <select id="company_id" className="form-control" required disabled>
                                <option value={price.company.id}>{price.company.name}</option>
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-4">Produto</label>
                        <select id="product_id" className="form-control" required disabled>
                            <option value={price.product.id}>{price.product.name}</option>
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-4">Valor</label>
                        <input 
                        id="price" 
                        type="number" 
                        className="form-control" 
                        step=".01"
                        defaultValue={price.price}
                        required />
                        <div className="invalid-feedback">
                            Valor inválido
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}