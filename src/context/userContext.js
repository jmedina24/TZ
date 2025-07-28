import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );

  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    localStorage.setItem('users', JSON.stringify(users));
  }, [currentUser, users]);

  // Función para login
  const login = (email, password) => {
    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      setCurrentUser(userFound);
      return { success: true };
    } else {
      return { success: false, message: 'Email o contraseña incorrectos' };
    }
  };

  // Mostrar toast reutilizable
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Añadir o quitar de favoritos con mensaje
  const toggleFavorite = (productId) => {
    if (!currentUser) {
      setShowLoginWarning(true);
      return;
    }

    const isFavorite = currentUser.favorites?.includes(productId);

    const updatedFavorites = isFavorite
      ? currentUser.favorites.filter((id) => id !== productId)
      : [...(currentUser.favorites || []), productId];

    const updatedUser = { ...currentUser, favorites: updatedFavorites };
    setCurrentUser(updatedUser);

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );

    showToast(isFavorite ? 'Producto eliminado de favoritos' : 'Producto añadido a favoritos');
  };

  const logout = () => setCurrentUser(null);
  const closeLoginWarning = () => setShowLoginWarning(false);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        setUsers,
        toggleFavorite,
        logout,
        login,
        showLoginWarning,
        closeLoginWarning,
        toastMessage,
        showToast, // 👈 función genérica para toasts
      }}
    >
      {children}
    </UserContext.Provider>
  );
};



