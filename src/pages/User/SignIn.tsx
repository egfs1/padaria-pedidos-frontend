import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AuthContext, ISignIn } from "../../contexts/AuthContext"
import logoImg from '../../assets/images/logo.png'
import { FiLock, FiUser } from "react-icons/fi"
import '../../styles/signin.scss'
import { api } from "../../services/api"
import { Link } from "react-router-dom"

export function SignIn(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const { signIn, isAuthenticated, errorMessage } = useContext(AuthContext)
    const [existsAdmin, setExistsAdmin] = useState<boolean | undefined>()

    useEffect(()=> {
        if(isAuthenticated){
            navigate('/orders')
        }

        api.get('/users/exists-admin').then(response => {
            setExistsAdmin(response.data)
        })
    },[navigate,isAuthenticated])

    async function handleSignIn(data : ISignIn){
        await signIn(data)

        navigate('/orders')
    }

    return(
        <div className="login-page container-xl">
            <div className="card-body">
                <div className="logo" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <img src={logoImg} alt="Logo"/>
                </div>
                <form className="form" onSubmit={handleSubmit(handleSignIn)}>
                    <div className="username-field">
                        <input {...register('username')} id="username" name="username" placeholder="Username" type="text" required/>
                        <FiUser/>
                    </div>
                    <div className="password-field">
                        <input {...register('password')} id="password" name="password" placeholder="Password" type="password" required />
                        <FiLock/>
                    </div>
                    {
                    errorMessage != undefined && 
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                    }
                    <button type="submit" className="btn btn-dark mt-4">Login</button>
                </form>
                {existsAdmin !== undefined && !existsAdmin && (
                    <Link className="admin-signup" to="/admin-signup">
                        <span>primeira vez? crie um usuário administrador</span>
                    </Link>
                )}
            </div>
        </div>

    )
}