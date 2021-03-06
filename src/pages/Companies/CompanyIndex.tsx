import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { useCompanies } from "../../hooks/useCompanies" 
import { api } from "../../services/api"
import { FiTrash, FiEdit } from "react-icons/fi"

export interface ICompany {
    id: string
    name: string
}

export function CompanyIndex() {
    const navigate = useNavigate()
    const { companies, setCompanies } = useCompanies()

    function handleEditCompany(company: ICompany){
        navigate(`/companies/${company.id}`) 
    }

    async function handleDeleteCompany(company: ICompany){
        if(window.confirm(`Você tem certeza que deseja excluir a empresa ${company.name}?`)){
            api.delete(`/companies/delete/${company.id}`).then(() => {
                const newCompanies = companies.filter(company_filtered => company_filtered.id !== company.id)
                setCompanies(newCompanies)
            })
        }
    }

    function handleNewCompany(){
        navigate(`/companies/new`) 
    }

    return (
        <div className="container-xl">
            <div className="card-header">
                <h2>Empresas</h2>
                <hr/>
                <button className="btn btn-dark" onClick={handleNewCompany}>Adicionar nova empresa</button>
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