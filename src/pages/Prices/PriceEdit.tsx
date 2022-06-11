import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"
import { api } from "../../services/api"
import { IPrice } from "./PriceIndex"

export function PriceEdit(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [price, setPrice] = useState<IPrice | undefined>()

    useEffect(()=> {
        api.get(`/prices/${id}`).then(response => {
            setPrice(response.data)
        })
    }, [id])

    async function handleUpdatePrice(event: FormEvent){
        event.preventDefault()

        const _price = parseFloat((document.getElementById('price') as HTMLInputElement).value)
        
        await api.put(`/prices/update/${price?.id}`, {price: _price})

        navigate('/prices')

    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Editar Preço</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdatePrice}  method="POST" className="needs-validation">
                        <label>Empresa</label>
                        <select id="company_id" className="form-control" required disabled>
                                <option value={price?.company.id}>{price?.company.name}</option>
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-4">Produto</label>
                        <select id="product_id" className="form-control" required disabled>
                            <option value={price?.product.id}>{price?.product.name}</option>
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
                        defaultValue={price?.price}
                        required />
                        <div className="invalid-feedback">
                            Valor inválido
                        </div>
                        <button type="submit" className="btn btn-dark mt-4">Salvar</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}