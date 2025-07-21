import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';

const Menu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAyudaOpen, setIsAyudaOpen] = useState(false);

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsAyudaOpen(false); // cerrar submenú al cerrar menú
    }, 400);
  };

  return (
    <div className="menu">
      {!isOpen && (
        <button
          className="menu__container"
          onClick={openMenu}
          aria-label="Abrir menú"
        >
          <i className="bi bi-list"></i>
        </button>
      )}

      {(isOpen || isClosing) && (
        <>
          <nav
            className={`menu__container-links ${
              isOpen && !isClosing ? 'active' : ''
            } ${isClosing ? 'closing' : ''}`}
          >
            <div className="menu__panel-header">
              <button
                className="menu__close-button"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                <i className="bi bi-arrow-left"></i>
              </button>

              <div className="menu__user-header">
                {user.firstName && user.lastName ? (
                  <span className="menu__user-name">
                    {user.firstName} {user.lastName}
                  </span>
                ) : (
                  <button className="menu__login">
                    <i className="bi bi-person-circle"></i>Mi cuenta
                  </button>
                )}
              </div>
            </div>

            <Link to="/">
              <i className="bi bi-house-door"></i>Inicio
            </Link>
            <Link to="#"><i className="bi bi-tag"></i>Ofertas</Link>
            <Link to='#'><i className="bi bi-star"></i>Más vendidos</Link>
            {user.firstName && user.lastName ? (<Link to='#'><i className="bi bi-heart"></i>Favoritos</Link>) : ''}
            {user.firstName && user.lastName ? (<Link to="#"><i class="bi bi-bag"></i>Mis compras</Link>) : ''}
            <Link to="#"><i class="bi bi-input-cursor"></i>Contacto</Link>

            <div
              className={`menu__submenu-container ${isAyudaOpen ? 'active' : ''}`}
              onClick={() => setIsAyudaOpen(!isAyudaOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsAyudaOpen(!isAyudaOpen);
              }}
            ><div><i class="bi bi-info-circle"></i>Ayuda</div>
              <i className={`bi ${isAyudaOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
            </div>

            {isAyudaOpen && (
              <div className="menu__submenu">
                <Link to="#">¿Cómo comprar?</Link>
                <Link to="#">Envíos y devoluciones</Link>
                <Link to="#">Preguntas frecuentes</Link>
                <Link to="#">Términos y condiciones</Link>
              </div>
            )}
          </nav>

          <div
            className={`menu__overlay ${isClosing ? 'fade-out' : ''}`}
            onClick={closeMenu}
          />
        </>
      )}
    </div>
  );
};

export default Menu;
