import React from 'react';
import Header from '../components/Header';
import { useUser } from '../context/userContext'; // NUEVO

const Home = () => {
  const { currentUser, toggleFavorite, logout } = useUser(); // NUEVO

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


