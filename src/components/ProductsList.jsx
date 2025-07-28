import React, { useState } from 'react';
import { useProducts } from '../context/productContext';
import ProductsCard from '../subComponents/ProductsCard';

const PRODUCTS_PER_PAGE = 10;

const ProductsList = ({ onAddToCart }) => {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * PRODUCTS_PER_PAGE;
  const firstIndex = lastIndex - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="products-list-container m-4">
      <div className="row">
        {currentProducts.map(product => (
          <div key={product.id} className="col-6 mb-4">
            <ProductsCard product={product} onAddToCart={() => onAddToCart(product)} />
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductsList;
