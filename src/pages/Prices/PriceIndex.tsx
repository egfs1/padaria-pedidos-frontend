import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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

export function PriceIndex(){
    const navigate = useNavigate()

    const [prices, setPrices] = useState<IPrice[]>([])
    const [companies, setCompanies] = useState<ICompany[]>([])

    function handleNewPrice(company: ICompany){
        navigate('/prices/new', {state: company})
    }

    function handleEditPrice(price: IPrice){
        navigate(`/prices/edit/${price.id}`, {state: price})
        
    }

    function handleDeletePrice(price: IPrice){
        if(window.confirm(`Você tem certeza que deseja excluir preço do produto ${price.product.name} da empresa ${price.company.name}?`)){
            api.delete(`/prices/delete/${price.id}`).then(() => {
                const newPrices = prices.filter(price_filtered => price_filtered.id !== price.id)
                setPrices(newPrices)
            })
        }

    }

    useEffect(()=>{
        api.get('/prices').then(response => {
            setPrices(response.data.prices)
            setCompanies(response.data.companies)
        })
    }, [])

    return (
        <div className="container-xl">
            <hr/>
            <div className="card-header">
                <h2>Preços</h2>
            </div>
            {companies.map((company,companyKey) => {
                return (
                    <div key={companyKey}>
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4>{company.name}</h4>
                                <div className="col col-12">
                                    <button onClick={()=> handleNewPrice(company)} className="btn btn-primary rounded-circle" style={{float:"right"}}>+</button>
                                </div>
                            </div>
                        </div>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Empresa</th>
                                    <th>Produto</th>
                                    <th>Valor</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prices.map((price,priceKey) => {
                                    if(price.company.name === company.name){
                                        return (
                                            <tr key={priceKey}>
                                                <th>{price.company.name}</th>
                                                <th>{price.product.name}</th>
                                                <th>{price.price.toFixed(2)}</th>
                                                <th>
                                                    <button onClick={()=> handleEditPrice(price)} className="btn btn-warning">Editar</button>
                                                    <button onClick={()=> handleDeletePrice(price)} className="btn btn-danger mx-1">Excluir</button>
                                                </th>
                                            </tr>
                                        )   
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>        
    )
}