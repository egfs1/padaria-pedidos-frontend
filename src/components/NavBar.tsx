import { useContext } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { IoMdPricetags, IoIosBusiness } from 'react-icons/io'
import { BiClipboard } from 'react-icons/bi'
import { BsGridFill } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../styles/navbar.scss'
import logoImg from '../assets/images/logo.png'

export function NavBar({children}) {
    const navigate = useNavigate()
    const { signOut, user } = useContext(AuthContext)

    function handleSignOut(){
        signOut()
        navigate('/login')
    }

    return (
        <>
            <header>
                <nav id="main-navbar" className="navbar navbar-dark bg-white fixed-top">
                    <div className="container-fluid">
                        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" type="button">
                            <FiMenu  className="navbar-toggler-icon" style={{stroke: 'black'}}/>
                        </button>
                        <Link className="navbar-brand" to='/orders' style={{display:'flex', alignItems: 'center'}}>
                            <img className="mx-auto" src={logoImg} alt="Logo" style={{width: '110px', height: 'auto', position: 'absolute', left: '0', right: '0'}}/>
                        </Link>
                    </div>
                </nav>

                <nav id="sidebarMenu" className="collapse sidebar bg-white">
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-2 mt-4">
                            <Link className='list-group-custom-item list-group-item-action ripple'  to="/orders">
                                <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                    <BiClipboard className="icon"/>
                                    <span>Pedidos</span>
                                </div>
                            </Link>
                            {user.isAdmin && (
                                <>
                                    <Link className='list-group-custom-item list-group-item-action ripple' to="/prices">
                                        <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                            <IoMdPricetags className="icon"/>
                                            <span>Preços</span>
                                        </div>
                                    </Link>
                                    <Link className='list-group-custom-item list-group-item-action ripple' to="/companies">
                                        <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                            <IoIosBusiness className="icon"/>
                                            <span>Empresas</span>
                                        </div>
                                    </Link>
                                    <Link  className='list-group-custom-item list-group-item-action ripple' to="/products">
                                        <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                            <BsGridFill className="icon"/>
                                            <span>Produtos</span>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="list-footer mx-2 mb-2">
                            <button onClick={handleSignOut}>
                                <div className='list-group-custom-item list-group-item-action ripple'>
                                    <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                        <FiLogOut className="icon"/>
                                        <span>Sair</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </header> 
            <main style={{marginTop: '72px'}}>
                {children}
            </main>
        </>

    )
}