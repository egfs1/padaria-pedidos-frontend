import { useForm } from "react-hook-form"
import { FiLock, FiUser, FiUserPlus } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export function UserNew(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    async function handleCreateUser(data : any){
        if(data.password === data.confirmpassword){
            await api.post("/users/save", data)

            navigate('/users')
        }
    }

    function handleReturn(){
        navigate('/users')
    }

    return(
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Criar novo usuário</h2>
                    <hr/>
                    <button onClick={()=> handleReturn()} className="btn btn-dark">Voltar</button>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit(handleCreateUser)}>
                        <div className="username-field">
                            <input {...register('username')} id="username" name="username" placeholder="Username" type="text" required/>
                            <FiUser/>
                        </div>
                        <div className="password-field">
                            <input {...register('password')} id="password" name="password" placeholder="Password" type="password" required />
                            <FiLock/>
                        </div>
                        <div className="confirm-password-field">
                            <input {...register('confirmpassword')} id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" type="password" required />
                            <FiLock/>
                        </div>
                        <div className="isAdmin-field">
                            <input {...register('isAdmin')} id="isAdmin" name="isAdmin" type="checkbox" />
                            Admin
                        </div>
                        <button type="submit" className="btn btn-dark mt-4">
                            <FiUserPlus/>
                            Criar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}