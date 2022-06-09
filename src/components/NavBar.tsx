import { useContext } from "react";
import { FiClipboard, FiDollarSign, FiGrid, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../styles/navbar.scss'

export function NavBar({children}) {
    const navigate = useNavigate()
    const { signOut } = useContext(AuthContext)

    function handleSignOut(){
        signOut()
        navigate('/login')
    }

    return (
        <>
            <header>
                <nav id="main-navbar" className="navbar navbar-dark bg-primary fixed-top">
                    <div className="container-fluid">
                        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" type="button">
                            <FiMenu  className="navbar-toggler-icon"/>
                        </button>
                        
                        <Link className="navbar-brand" to='/orders' style={{display:'flex',justifyContent:'center'}}>
                            Sabor do Trigo
                        </Link>
                    </div>
                </nav>

                <nav id="sidebarMenu" className="collapse sidebar bg-white">
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <Link className='list-group-custom-item list-group-item-action ripple'  to="/orders">
                                <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                    <FiClipboard/>
                                    <span>Pedidos</span>
                                </div>
                            </Link>
                            <Link className='list-group-custom-item list-group-item-action ripple' to="/prices">
                                <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                    <FiDollarSign/>
                                    <span>Preços</span>
                                </div>
                            </Link>
                            <Link className='list-group-custom-item list-group-item-action ripple' to="/companies">
                                <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                    <FiUser/>
                                    <span>Empresas</span>
                                </div>
                            </Link>
                            <Link  className='list-group-custom-item list-group-item-action ripple' to="/products">
                                <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                    <FiGrid/>
                                    <span>Produtos</span>
                                </div>
                            </Link>
                            <button className='list-group-custom-item list-group-item-action ripple' onClick={handleSignOut}>
                                <div className="w-100 h-100" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                                    <FiLogOut/>
                                    <span>Sair</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </header> 
            <main style={{marginTop: '58px'}}>
                {children}
            </main>
        </>

    )
}