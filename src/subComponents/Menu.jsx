import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/menu.css';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import PersonalData from '../components/PersonalData';
import CategoryOverlay from './CategoryOverlay';
import { useUser } from '../context/userContext';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAyudaOpen, setIsAyudaOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [registerEmailPass, setRegisterEmailPass] = useState(null);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const { currentUser, users, login, logout, toggleFavorite, setUsers } = useUser();

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsAyudaOpen(false);
    }, 400);
  };

  const handleCategoryClick = (path) => {
    setShowCategories(false);
    setIsOpen(false);
    navigate(path);
  };

  // Manejar login usando contexto
  const handleLogin = (email, password) => {
    const result = login(email, password);
    if (result.success) {
      setLoginError('');
      setShowLogin(false);
      setIsOpen(false);
    } else {
      setLoginError(result.message);
    }
  };

  const handleRegister = (data) => {
    setRegisterEmailPass(data);
    setShowRegister(false);
    setShowPersonalData(true);
  };

  // Registro nuevo usuario y actualización global de users
  const handleRegisterPersonalData = (personalData) => {
    if (!registerEmailPass) return;
    const newUser = { ...registerEmailPass, ...personalData, favorites: [] };
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (emailExists) {
      alert('Ya existe una cuenta asociada a ese correo electrónico...');
      setShowPersonalData(false);
      setRegisterEmailPass(null);
      return;
    }

    setUsers((prev) => [...prev, newUser]);
    setRegisterEmailPass(null);
    setShowPersonalData(false);
    alert('Usuario creado correctamente');
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOpenLogin = () => {
      setShowRegister(false);
      setShowLogin(true);
    };
    window.addEventListener('openLogin', handleOpenLogin);
    return () => {
      window.removeEventListener('openLogin', handleOpenLogin);
    };
  }, []);

  const avatar = currentUser?.avatar || "https://i.pravatar.cc/150?img=3";

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
                  <>
                    <img
                      src={avatar}
                      alt={`${currentUser.firstName} avatar`}
                      className="menu__user-avatar"
                    />
                    <span className="menu__user-name">
                      {currentUser.firstName} {currentUser.firstSurname}
                    </span>
                  </>
                ) : (
                  <button
                    className="menu__login"
                    onClick={() => setShowLogin(true)}
                  >
                    <i className="bi bi-person-circle"></i>Mi cuenta
                  </button>
                )}
              </div>
            </div>

            <Link to="/" onClick={() => setIsOpen(false)}>
              <i className="bi bi-house-door"></i>Inicio
            </Link>
            <button
              className="menu__btn-categories"
              onClick={() => setShowCategories(true)}
            >
              <i className="bi bi-list-ul"></i>Categorías
            </button>
            <Link to="/offers" onClick={() => setIsOpen(false)}>
              <i className="bi bi-tag"></i>Ofertas
            </Link>
            <Link to="/bestsellers" onClick={() => setIsOpen(false)}>
              <i className="bi bi-star"></i>Más vendidos
            </Link>
            {currentUser?.firstName && currentUser?.firstSurname && (
              <>
                <Link to="/favorites" onClick={() => setIsOpen(false)}>
                  <i className="bi bi-heart"></i>Favoritos
                </Link>
                <Link to="#" onClick={() => setIsOpen(false)}>
                  <i className="bi bi-bag"></i>Mis compras
                </Link>
                <Link to="#" onClick={() => setIsOpen(false)}>
                  <i className="bi bi-gear"></i>Administrar perfil
                </Link>
                <button onClick={handleLogout} className="menu__logout">
                  <i className="bi bi-box-arrow-right"></i>Cerrar sesión
                </button>
              </>
            )}
            <Link to="/contact">
              <i className="bi bi-input-cursor"></i>Contacto
            </Link>

            <div
              className={`menu__submenu-container ${
                isAyudaOpen ? 'active' : ''
              }`}
              onClick={() => setIsAyudaOpen(!isAyudaOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  setIsAyudaOpen(!isAyudaOpen);
              }}
            >
              <div>
                <i className="bi bi-info-circle"></i>Ayuda
              </div>
              <i
                className={`bi ${
                  isAyudaOpen ? 'bi-chevron-up' : 'bi-chevron-down'
                }`}
              />
            </div>

            {isAyudaOpen && (
              <div className="menu__submenu">
                <Link to="#" onClick={() => setIsOpen(false)}>
                  ¿Cómo comprar?
                </Link>
                <Link to="#" onClick={() => setIsOpen(false)}>
                  Envíos y devoluciones
                </Link>
                <Link to="#" onClick={() => setIsOpen(false)}>
                  Preguntas frecuentes
                </Link>
                <Link to="#">Términos y condiciones</Link>
              </div>
            )}

            <CategoryOverlay
              isOpen={showCategories}
              onClose={() => setShowCategories(false)}
              onCategoryClick={(path) => {
                setShowCategories(false);
                setIsOpen(false);
                navigate(path);
              }}
            />
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
            setShowRegister(true);
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

      <CategoryOverlay
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
        onSelectedCategory={() => {
          setShowCategories(false);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default Menu;

