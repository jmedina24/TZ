import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import PersonalData from '../components/PersonalData';

const Menu = ({ user, onLogout }) => {

    // Menú
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

    // Login / Registro
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showPersonalData, setShowPersonalData] = useState(false);
    const [registerEmailPass, setRegisterEmailPass] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loginError, setLoginError] = useState('');

    const handleLogin = (email, password) => {
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            setCurrentUser(foundUser);
            setLoginError('');
            setShowLogin(false);
            alert(`Bienvenido, ${foundUser.firstName || 'usuario'}!`);
        }else{
            setLoginError('Usuario o contraseña incorrectos');
        }
    };

    const handleRegister = (data) => {
        console.log('Registro con: ', data);
        setRegisterEmailPass(data);
        setShowRegister(false);
        setShowPersonalData(true);
    };

    const handleRegisterPersonalData = (personalData) => {
        if (!registerEmailPass) return;

    const newUser = { ...registerEmailPass, ...personalData };

    // Verificar si el email ya está registrado
    const emailExists = users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase());

    if (emailExists) {
        alert('Ya existe una cuenta asociada a ese correo electrónico...');
        setShowPersonalData(false);
        setRegisterEmailPass(null);
        return;
    }


    setUsers(prev => [...prev, newUser]);
    setRegisterEmailPass(null);
    setShowPersonalData(false);
    alert('Usuario creado correctamente');
    }

    const handleLogout = () => {
        alert('Sesión cerrada');
        setCurrentUser(null);
    };

    

    useEffect(() => {
        const handleOpenLogin = () => {
            setShowRegister(false);
            setShowLogin(true);
        };
        window.addEventListener('openLogin', handleOpenLogin);
        return () => {
            window.removeEventListener('openLogin', handleOpenLogin)
        };
    }, []);

    useEffect(() => {
        console.log('Usuarios actualizados: ', users);
    }, [users]);

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
                {currentUser?.firstName && currentUser?.firstSurname ? (
                  <span className="menu__user-name">{currentUser.firstName} {currentUser.firstSurname}
                  </span>
                ) : (
                  <button className="menu__login" onClick={() => setShowLogin(true)}>
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
            {currentUser?.firstName && currentUser?.firstSurname ? (<Link to='#'><i className="bi bi-heart"></i>Favoritos</Link>) : ''}
            {currentUser?.firstName && currentUser?.firstSurname ? (<Link to="#"><i class="bi bi-bag"></i>Mis compras</Link>) : ''}
            {currentUser?.firstName && currentUser?.firstSurname ? (<Link to="#"><i class="bi bi-gear"></i>Administrar perfil</Link>) : ''}
            {currentUser?.firstName && currentUser?.firstSurname ? (<button onClick={handleLogout} className="menu__logout"><i className="bi bi-box-arrow-right"></i>Cerrar sesión</button>) : ''}
            <Link to="#"><i className="bi bi-input-cursor"></i>Contacto</Link>

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

      {showLogin && (
        <Login
            show={showLogin}
            handleClose={() => setShowLogin(false)}
            handleLogin={handleLogin}
            openRegister={() => {
                setShowLogin(false);
                setShowRegister(true)
            }}
            loginError={loginError}
            />
      )}

      {showRegister && (
        <SignUp
            show={showRegister}
            handleClose={() => setShowRegister(false)}
            handleRegister={handleRegister}
            users={users}
        />
      )}

      {showPersonalData && (
        <PersonalData
            show={showPersonalData}
            handleClose={() => setShowPersonalData(false)}
            handleRegister={handleRegisterPersonalData}
        />
      )}
    </div>
  );
};

export default Menu;
