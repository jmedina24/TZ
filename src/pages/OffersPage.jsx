import React from 'react'
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import '../css/offersPage.css';
import Header from '../components/Header';
import ProductsCard from '../subComponents/ProductsCard';

const OffersPage = ({ onAddToCart }) => {
  const navigate = useNavigate();

  // Filtra productos que tengan descuento
  const offerProducts = products.filter(p => p.discountPercent && p.discountPercent > 0);

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log('Producto que se agregaría:', product);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">Ofertas</h2>
        <div className="row">
          {offerProducts.length === 0 && (
            <div className="col-12">
              <p className="text-center">No hay productos en oferta en este momento...</p>
            </div>
          )}

          {offerProducts.map(product => (
            <div className="col-6 col-md-3 mb-4" key={product.id}>
              <ProductsCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OffersPage;
