import { useContext } from 'react'
import { FiEdit, FiTrash } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { AuthContext } from "../../contexts/AuthContext"
import { useUsers } from "../../hooks/useUsers"
import { api } from "../../services/api"

export interface IUser {
    id: string
    username: string
    isAdmin: boolean
}

export function UserIndex(){
    const navigate = useNavigate()

    const { user: globalUser } = useContext(AuthContext)
    const { users, setUsers } = useUsers()

    function handleNewUser(){
        navigate(`/users/new`)
    }

    function handleEditUser(user: IUser){
        navigate(`/users/${user.id}`)
        
    }

    function handleDeleteUser(user: IUser){
        if(window.confirm(`Você tem certeza que deseja excluir o usuario ${user.username}?`)){
            api.delete(`/users/delete/${user.id}`).then(() => {
                const newUsers = users.filter(user_filtered => user_filtered.id !== user.id)
                setUsers(newUsers)
            })
        }
    }

    return (
        <div className="container-xl">
            <div className="card-header">
                <h2>Usuarios</h2>
                <hr/>
                <button className="btn btn-dark" onClick={handleNewUser}>Adicionar novo usuario</button>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Nome de usuario</th>
                        <th>Admin</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key)=> {
                        return (
                            <tr key={key}>
                                <th>{user.username}</th>
                                <th>{user.isAdmin ? "SIM" : "NÃO"}</th>
                                <th>
                                    <Button text="Editar" type="btn-warning mx-1 mb-1" icon={<FiEdit />} onClick={()=> handleEditUser(user)}/>
                                    {user.username == globalUser.username ?  
                                    <Button text="Excluir" type="btn-danger mx-1 mb-1" icon={<FiTrash />} onClick={()=> handleDeleteUser(user)} disabled/>
                                    :
                                    <Button text="Excluir" type="btn-danger mx-1 mb-1" icon={<FiTrash />} onClick={()=> handleDeleteUser(user)}/>
                                    }
                                </th>
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>      
    )
}