import React, { useState } from 'react';
import { products } from '../data/products';
import '../css/offersPage.css';
import Header from '../components/Header';
import ProductsCard from '../subComponents/ProductsCard';

const PRODUCTS_PER_PAGE = 10;

const OffersPage = ({ onAddToCart }) => {
  const offerProducts = products.filter(p => p.discountPercent && p.discountPercent > 0);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(offerProducts.length / PRODUCTS_PER_PAGE);

  const firstIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = offerProducts.slice(firstIndex, firstIndex + PRODUCTS_PER_PAGE);

  const handleAddToCart = (product) => {
    if (onAddToCart) onAddToCart(product);
    else console.log('Producto que se agregaría:', product);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-4">
        <h2 className="mb-4">Ofertas</h2>

        {offerProducts.length === 0 ? (
          <p className="text-center">No hay productos en oferta en este momento...</p>
        ) : (
          <>
            <div className="row">
              {currentProducts.map(product => (
                <div key={product.id} className="col-6 col-md-3 px-2.5 mb-4">
                  <ProductsCard product={product} onAddToCart={() => handleAddToCart(product)} />
                </div>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OffersPage;

