import { useNavigate } from "react-router-dom"
import { useCompanies } from "../../hooks/useCompanies"
import { usePrices } from "../../hooks/usePrices"
import { api } from "../../services/api"
import { FiTrash, FiEdit } from "react-icons/fi"
import { Button } from "../../components/Button"
import { ICompany } from "../Companies/CompanyIndex"
import { IProduct } from "../Products/ProductIndex"
import { SiAddthis } from "react-icons/si"

export interface IPrice {
    id: string
    price: number
    company: ICompany
    product: IProduct
}

export function PriceIndex(){
    const navigate = useNavigate()

    const { prices, setPrices } = usePrices()
    const { companies } = useCompanies()

    function handleNewPrice(company: ICompany){
        navigate(`/prices/${company.id}/new`)
    }

    function handleEditPrice(price: IPrice){
        navigate(`/prices/${price.id}`)
        
    }

    function handleDeletePrice(price: IPrice){
        if(window.confirm(`Você tem certeza que deseja excluir preço do produto ${price.product.name} da empresa ${price.company.name}?`)){
            api.delete(`/prices/delete/${price.id}`).then(() => {
                const newPrices = prices.filter(price_filtered => price_filtered.id !== price.id)
                setPrices(newPrices)
            })
        }

    }

    return (
        <div className="container-xl">
            <div className="card-header">
                <h2>Preços</h2>
            </div>
            {companies.map((company,companyKey) => {
                return (
                    <div key={companyKey}>
                        <div className="card mt-4">
                            <div className="card-header">
                                <div className="col col-12" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <h4>{company.name}</h4>
                                    <div className="new-price">
                                        <SiAddthis size="32px" onClick={()=> handleNewPrice(company)} style={{cursor: 'pointer'}} />
                                    </div>
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
                                                    <Button text="Editar" type="btn-warning mx-1 mb-1" icon={<FiEdit />} onClick={()=>  handleEditPrice(price)}/>
                                                    <Button text="Excluir" type="btn-danger mx-1 mb-1" icon={<FiTrash />} onClick={()=> handleDeletePrice(price)}/>
                                                </th>
                                            </tr>
                                        )   
                                    }
                                    return null
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>        
    )
}