import { FormEvent, useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { api } from "../../services/api"
import { ICompany } from "../Companies/CompanyIndex"

export function PriceNew() {
    const navigate = useNavigate()
    const { company_id } = useParams()
    const { products } = useProducts()
    const [company, setCompany] = useState<ICompany | undefined>()

    useEffect(()=> {
        api.get(`/companies/${company_id}`).then(response => {
            setCompany(response.data)
        })
    }, [company_id])

    async function handleSendPrice(event: FormEvent){
        event.preventDefault()

        const company_id =  (document.getElementById('company_id') as HTMLInputElement).value
        const product_id =  (document.getElementById('product_id') as HTMLInputElement).value
        const price =  (document.getElementById('price') as HTMLInputElement).value

        await api.post('/prices/save', {company_id: company_id, product_id: product_id, price: price})
    
        window.location.reload()
    }

    function handleGoBack(){
        navigate('/prices')
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Novo Preço</h2>
                    <hr/>
                    <button onClick={()=> handleGoBack()} className="btn btn-dark">Voltar</button>
                </div>
                <div className="card-body">
                    <form id="form" onSubmit={handleSendPrice} method="POST" className="needs-validation">
                        <label>Empresa</label>
                        <select id="company_id" className="form-control" required>
                                <option value={company?.id}>{company?.name}</option>
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
                        <button form="form" type="submit" className="btn btn-dark mt-4">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>        
    )
}