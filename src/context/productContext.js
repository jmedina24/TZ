import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as mockProducts } from '../data/products'; // Ajustá si estás usando otro path

const ProductContext = createContext();

// Hook personalizado para usar el contexto
export const useProducts = () => useContext(ProductContext);

// Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    // Cargar productos desde archivo simulado
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Alternar favorito
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  // Comprobar si un producto es favorito
  const isFavorite = (productId) => favorites.includes(productId);

  return (
    <ProductContext.Provider
      value={{
        products,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

