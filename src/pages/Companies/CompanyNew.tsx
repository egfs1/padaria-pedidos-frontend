import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export function CompanyNew(){

    const navigate = useNavigate()

    async function handleSendCompany(event: FormEvent){
        event.preventDefault()

        const name = (document.getElementById('name') as HTMLInputElement).value

        await api.post('/companies/save', {name: name})

        navigate('/companies')
    }

    return (
        <div className="container">
            <hr />
            <div className="card">
                <div className="card-header">
                    <h2>Nova Empresa</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSendCompany} className="needs-validation" method="POST">
                        <input 
                        className='form-control' 
                        type="text" 
                        id='name'
                        placeholder='Nome da Empresa' required />
                        <button type="submit" className="btn btn-primary mt-4">Salvar</button>
                    </form>
                </div>
            </div>
        </div>        
    )

}