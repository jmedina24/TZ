import React, { useState } from 'react'
import Header from '../components/Header'

const Home = () => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });

  const handleLogout = () => {
    console.log('Sesión cerrada');
    setUser(null);
  }
  
  return (
    <>
    <Header user={user} onLogout={handleLogout}/>
    {console.log(user)}
    </>
  )
}

export default Home