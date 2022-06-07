import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary" style={{display: 'grid',justifyContent: 'center', alignItems: 'center'}}>
            <Link className="navbar-brand mx-3" to='/orders' style={{display:'flex',justifyContent:'center'}}>
                Sabor do Trigo
            </Link>
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                <ul className="navbar-nav mr-auto" > 
                    <li className="nav-item">
                        <Link className='nav-link' to="/orders">Pedidos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to="/prices">Preços</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to="/companies">Empresas</Link>
                    </li>
                    <li className="nav-item">
                        <Link  className='nav-link' to="/products">Produtos</Link>
                    </li>
                </ul>
            </div>
        </nav>        
    )
}