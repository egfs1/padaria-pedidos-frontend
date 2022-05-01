import { FormEvent } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"

interface ICompany {
    id: string
    name: string
}

interface ILocationState {
    state: ICompany
}


export function CompanyEdit() {
    const location = useLocation()
    const navigate = useNavigate()
    const {state: company} = location as ILocationState
    const {id} = useParams()

    async function handleUpdateCompany(event: FormEvent){
        event.preventDefault()

        const name = (document.getElementById('name') as HTMLInputElement).value
        
        await api.put(`/companies/update/${id}`, {name: name})

        navigate('/companies')

    }

    return (
        <div className="container">
            <hr />
            <div className="card">
                <div className="card-header">
                    <h2>Novo Artigo</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdateCompany} className="needs-validation" method="POST">
                        <input 
                        className='form-control' 
                        type="text" 
                        id='name'
                        defaultValue={company.name}
                        placeholder={company.name} 
                        required />
                        <button type="submit" className="btn btn-primary mt-4">Salvar</button>
                    </form>
                </div>
            </div>
        </div>             
    )
}