import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AuthContext, ISignIn } from "../../contexts/AuthContext"
import logoImg from '../../assets/images/logo.png'
import { FiLock, FiUser } from "react-icons/fi"
import '../../styles/signin.scss'

export function SignIn(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const { signIn, isAuthenticated } = useContext(AuthContext)

    useEffect(()=> {
        if(isAuthenticated){
            navigate('/orders')
        }
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
                    <button type="submit" className="btn btn-dark mt-4">Login</button>
                </form>
            </div>
        </div>

    )
}