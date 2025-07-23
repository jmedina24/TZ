import React, { useState } from 'react';
import { products } from '../data/products'; // Ajusta la ruta si es necesario
import ProductsCard from '../subComponents/ProductsCard';
import { Pagination } from 'react-bootstrap';
import Header from '../components/Header';

const ITEMS_PER_PAGE = 10; // 2 columnas x 5 filas

const BestSellersPage = ({ onAddToCart }) => {
  // Ordeno los productos por sold descendente y tomo top 50 para paginar más fácil (opcional)
  const sortedProducts = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 50);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const currentItems = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <Header />
    <div className="container mt-3">
      <h3 className="mb-3">Más vendidos</h3>

      <div className="row">
        {currentItems.map(product => (
          <div key={product.id} className="col-6 mb-3">
            <ProductsCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={currentPage === idx + 1}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </div>
    </>
  );
};

export default BestSellersPage;
