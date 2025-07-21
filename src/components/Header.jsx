import React from 'react'
import '../css/header.css';
import Menu from '../subComponents/Menu';

const Header = ({user, onLogout}) => {
  return (
    <div className='header'>
        {/* Acceso a Menú y Buscador */}
        <div className='header__container-left'>
            {/* Menú Hamburguesa (Mobile) */}
            <div className='header__container-menu'>
                <Menu user={user} onLogout={onLogout}/>
            </div>

            {/* Ícono de Búsqueda (Mobile) */}
            <div className='header__container-search'>

            </div>
        </div>

        {/* Logo de website con acceso a Home */}
        <div className='header__container-center'>

        </div>

        {/* Acceso a Favoritos y Carrito de Compras */}
        <div className='header__container-right'>

        </div>
    </div>
  )
}

export default Header