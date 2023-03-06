import {useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FiLock, FiUser, FiUserPlus } from 'react-icons/fi'
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { IUser } from "./UserIndex"

export function UserEdit(){
    const { id } = useParams()
    const navigate = useNavigate()

    const { user: globalUser } = useContext(AuthContext);

    const { register, handleSubmit } = useForm()
    const [user, setUser] = useState<IUser | undefined>()

    useEffect(()=> {
        api.get(`/users/${id}`).then(response => {
            setUser(response.data)
        })
    },[id])

    async function handleUpdateUser(data: any){
        if(data.password != "" || data.confirmpassword != ""){
            
            if(data.password === data.confirmpassword){
                await api.put(`/users/update/${id}`, data)
            }
        }
        else{
            await api.put(`/users/update/${id}`, data)
        }

        navigate('/users')
        window.location.reload()
    }

    function handleGoBack(){
        navigate('/users')
    }

    return(
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Editar usuário</h2>
                    <hr/>
                    <button onClick={()=> handleGoBack()} className="btn btn-dark">Voltar</button>
                </div>
                <div className="card-body">
                    {user != undefined && 
                        <form className="form" onSubmit={handleSubmit(handleUpdateUser)}>
                            <div className="username-field">
                                <input {...register('username')} id="username" name="username" placeholder={user.username} type="text" defaultValue={user.username} required/>
                                <FiUser/>
                            </div>
                            <div className="password-field">
                                <input {...register('password')} id="password" name="password" placeholder="New password" type="password" />
                                <FiLock/>
                            </div>
                            <div className="confirm-password-field">
                                <input {...register('confirmpassword')} id="confirmpassword" name="confirmpassword" placeholder="Confirm new password" type="password" />
                                <FiLock/>
                            </div>
                            <div className="isAdmin-field">
                                {globalUser.username == user.username ? 
                                <input {...register('isAdmin')} id="isAdmin" name="isAdmin" type="checkbox" defaultChecked={user.isAdmin} disabled/>
                                :
                                <input {...register('isAdmin')} id="isAdmin" name="isAdmin" type="checkbox" defaultChecked={user.isAdmin} />
                                }
                                Admin
                            </div>
                            <button type="submit" className="btn btn-dark mt-4">
                                <FiUserPlus/>
                                Criar
                            </button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}