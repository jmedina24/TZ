import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/productsCard.css';

const ProductsCard = ({ product, onAddToCart, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Evita que clicks en botón o ícono de favorito redirijan
    if (
      e.target.closest('.add-to-cart-btn') ||
      e.target.closest('.favorite-icon')
    )
      return;

    navigate(`/producto/${product.id}`);
  };

  const getDiscountedPrice = () => {
    if (!product.discountPercent || product.discountPercent <= 0) return null;
    return (product.price - product.price * (product.discountPercent / 100)).toFixed(2);
  };

  return (
    <div
      className="card product-card h-100 shadow-sm position-relative"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {product.discountPercent > 0 && (
        <span className="discount-badge">
          {product.discountPercent}% OFF
        </span>
      )}

      {/* Ícono de favorito */}
      <i
        className={`bi bi-heart${isFavorite ? '-fill text-danger' : ''} favorite-icon`}
        onClick={toggleFavorite}
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      ></i>

      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
      />

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.name}</h5>
          {product.discountPercent > 0 ? (
            <>
              <p className="price-original">${product.price.toFixed(2)}</p>
              <p className="price-discounted">${getDiscountedPrice()}</p>
            </>
          ) : (
            <p className="fw-bold">${product.price.toFixed(2)}</p>
          )}
        </div>
        <div className="text-center mt-3">
          <Button
            className="add-to-cart-btn"
            variant="primary"
            onClick={() => onAddToCart(product)}
          >
            Añadir al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;


