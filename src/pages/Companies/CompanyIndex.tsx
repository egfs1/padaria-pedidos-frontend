import { useNavigate } from "react-router-dom"
import { useCompanies } from "../../contexts/useCompanies" 
import { api } from "../../services/api"

interface ICompany {
    id: string
    name: string
}

export function CompanyIndex() {
    const navigate = useNavigate()
    const {companies, setCompanies} = useCompanies()

    function handleEditCompany(company: ICompany){
        navigate(`/companies/edit/${company.id}`, {state: company}) 
    }

    async function handleDeleteCompany(company: ICompany){
        if(window.confirm(`Você tem certeza que deseja excluir a empresa ${company.name}?`)){
            api.delete(`/companies/delete/${company.id}`).then(() => {
                const newCompanies = companies.filter(company_filtered => company_filtered.id !== company.id)
                setCompanies(newCompanies)
            })
        }
    }

    return (
        <div className="container-xl">
            <hr/>
            <div className="card-header">
                <h2>Empresas</h2>
                <hr/>
                <a className="btn btn-primary" href='/companies/new'>Adicionar nova empresa</a>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, key)=> {
                        return (
                            <tr key={key}>
                                <th>{company.name}</th>
                                <th>
                                    <button onClick={()=> handleEditCompany(company)} className="btn btn-warning">Editar</button>
                                    <button onClick={()=> handleDeleteCompany(company)} className="btn btn-danger mx-1">Excluir</button>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>        
    )

}