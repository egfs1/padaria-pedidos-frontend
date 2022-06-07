import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AuthContext, ISignIn } from "../../contexts/AuthContext"

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
        <div>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <input {...register('username')} id="username" name="username" placeholder="Username" type="text" className="form-control" required/>
                <input {...register('password')} id="password" name="password" placeholder="Password" type="password" className="form-control" required />
                <button type="submit" className="btn btn-primary mt-4">Login</button>
            </form>
        </div>

    )
}