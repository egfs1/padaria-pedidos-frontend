import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { useCompanies } from "../../contexts/useCompanies" 
import { api } from "../../services/api"
import { FiTrash, FiEdit, FiPlus } from "react-icons/fi"

export interface ICompany {
    id: string
    name: string
}

export function CompanyIndex() {
    const navigate = useNavigate()
    const {companies, setCompanies} = useCompanies()

    function handleEditCompany(company: ICompany){
        navigate(`/companies/${company.id}`, {state: company}) 
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
                                    <Button text="Editar" type="btn-warning mx-1 mb-1" icon={<FiEdit />} onClick={()=>  handleEditCompany(company)}/>
                                    <Button text="Excluir" type="btn-danger mx-1 mb-1" icon={<FiTrash />} onClick={()=> handleDeleteCompany(company)}/>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>        
    )

}