import React from 'react';
import Header from '../components/Header';
import { products } from '../data/products';
import ProductsList from '../components/ProductsList';
import { useUser } from '../context/userContext'; // NUEVO
import LoginWarning from '../subComponents/LoginWarning';

const Home = () => {
  const { currentUser, toggleFavorite, logout } = useUser(); // NUEVO
  const { showLoginWarning, closeLoginWarning } = useUser();

  const handleAddToCart = (product) => {
    // Logica para agregar producto al carrito
    alert(`Agregaste ${product.name} al carrito.`);
  };

  return (
    <>
      <Header
        currentUser={currentUser}
        toggleFavorite={toggleFavorite}
        onLogout={logout}
      />
    </>
  );
};

export default Home;


