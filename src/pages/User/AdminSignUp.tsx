import { FiLock, FiUser } from 'react-icons/fi'
import { useForm } from "react-hook-form"
import logoImg from '../../assets/images/logo.png'
import { useContext, useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

export function AdminSignUp(){
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const { signUp } = useContext(AuthContext)

    useEffect(()=> {
        api.get('/users/exists-admin').then(response => {
            if(response.data){
                navigate('/login')
            }
        })
    },[navigate])

    async function handleSignUp(data: any){
        
        if(data.password === data.confirmpassword){
            await signUp(data)

            navigate('/orders')
        }
    }

    return (
        <div className="admin-signup-page container-xl">
            <div className="card-body">
                <div className="logo" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <img src={logoImg} alt="Logo"/>
                </div>
                <form className="form" onSubmit={handleSubmit(handleSignUp)}>
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
                    <button type="submit" className="btn btn-dark mt-4">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}