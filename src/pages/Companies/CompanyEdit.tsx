import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams} from "react-router-dom"
import { api } from "../../services/api"
import { ICompany } from "./CompanyIndex"

export function CompanyEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [company, setCompany] = useState<ICompany | undefined>()

    useEffect(()=> {
        api.get(`/companies/${id}`).then(response => {
            setCompany(response.data)
        })
    }, [id])

    async function handleUpdateCompany(event: FormEvent){
        event.preventDefault()

        const name = (document.getElementById('name') as HTMLInputElement).value
        
        await api.put(`/companies/update/${company?.id}`, {name: name})
        navigate('/companies')

    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Editar Empresa</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdateCompany} className="needs-validation" method="POST">
                        <input 
                        className='form-control' 
                        type="text" 
                        id='name'
                        defaultValue={company?.name}
                        placeholder={company?.name} 
                        required />
                        <button type="submit" className="btn btn-dark mt-4">Salvar</button>
                    </form>
                </div>
            </div>
        </div>             
    )
}