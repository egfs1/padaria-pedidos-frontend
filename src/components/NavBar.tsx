export function NavBar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary" style={{display: 'grid',justifyContent: 'center', alignItems: 'center'}}>
            <a className="navbar-brand mx-3" href='/orders' style={{display:'flex',justifyContent:'center'}}>
                Sabor do Trigo
            </a>
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                <ul className="navbar-nav mr-auto" > 
                    <li className="nav-item">
                        <a className='nav-link' href="/orders">Pedidos</a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' href="/prices">Preços</a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' href="/companies">Empresas</a>
                    </li>
                    <li className="nav-item">
                        <a  className='nav-link' href="/products">Produtos</a>
                    </li>
                </ul>
            </div>
        </nav>        
    )
}