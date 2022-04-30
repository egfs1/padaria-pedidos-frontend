export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            <a className="navbar-brand mx-3" href='/'>
                Padaria Pedidos
            </a>
            <ul className="navbar-nav mr-auto">
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
        </nav>        
    )
}