import { FormEvent, useEffect, useState } from "react"
import { useLocation} from "react-router-dom"
import { useProduct } from "../../contexts/useProduct"
import { api } from "../../services/api"

interface ICompany {
    id: string
    name: string
}

interface ILocationState {
    state: ICompany
}


export function PriceNew() {
    const location = useLocation()
    const {products, setProducts} = useProduct()
    const {state: company} = location as ILocationState

    async function handleSendPrice(event: FormEvent){
        event.preventDefault()

        const company_id =  (document.getElementById('company_id') as HTMLInputElement).value
        const product_id =  (document.getElementById('product_id') as HTMLInputElement).value
        const price =  (document.getElementById('price') as HTMLInputElement).value

        await api.post('/prices/save', {company_id: company_id, product_id: product_id, price: price})
    
        window.location.reload()
    }

    useEffect(()=>{
        api.get('/products').then(response => {
            setProducts(response.data)
        })
    },[])

    return (
        <div className="container">
            <hr/>
            <div className="card">
                <div className="card-header">
                    <h2>Novo Preço</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSendPrice} method="POST" className="needs-validation">
                        <label>Empresa</label>
                        <select id="company_id" className="form-control" required>
                                <option value={company.id}>{company.name}</option>
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-4">Produto</label>
                        <select id="product_id" className="form-control" required>
                            {products.map((product,key) => {
                                return (
                                    <option key={key} value={product.id}>{product.name}</option>
                                )
                            })}
                        </select>
                        <div className="invalid-feedback">
                            Opção inválida
                        </div>
                        <label className="mt-4">Valor</label>
                        <input id="price" type="number" className="form-control" step=".01" required />
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