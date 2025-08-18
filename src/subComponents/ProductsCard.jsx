import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/productsCard.css';
import { useUser } from '../context/userContext';

const ProductsCard = ({ product, onAddToCart }) => {
  const { currentUser, toggleFavorite, favoriteMessage } = useUser();
  const navigate = useNavigate();

  if (!product) return <div className="product-card card" />;

  const isFavorite = currentUser?.favorites?.includes(product.id);

  const handleCardClick = (e) => {
    if (e.target.closest('.add-to-cart-btn') || e.target.closest('.favorite-icon')) return;
    navigate(`/product/${product.id}`);
  };

  const discountedPrice = product.discountPercent
    ? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
    : null;

  return (
    <div className="product-card card position-relative" onClick={handleCardClick}>
      {/* Ribbon diagonal */}
      {product.stock === 0 && (
        <div className="ribbon"><span>SIN STOCK</span></div>
      )}

      {/* Toast de favoritos */}
      {favoriteMessage && <div className="favorite-toast">{favoriteMessage}</div>}

      {/* Badge de descuento */}
      {product.discountPercent && (
        <div className="discount-badge">{product.discountPercent}% OFF</div>
      )}

      {/* Corazón favoritos */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="favorite-icon btn p-0"
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        type="button"
      >
        <i
          className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart text-secondary'}`}
          style={{ fontSize: '1.4rem' }}
        />
      </button>

      {/* Imagen */}
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={product.stock === 0 ? { opacity: 0.6 } : {}}
        />
      )}

      <div className="card-body d-flex flex-column">
        {/* Título */}
        <h5 className="card-title">{product.name}</h5>

        {/* Precios */}
        <div className="price-container">
          {product.discountPercent ? (
            <>
              <p className="price-original">${product.price.toFixed(2)}</p>
              <p className="price-discounted">${discountedPrice}</p>
            </>
          ) : (
            <p className="price-original price-normal">${product.price.toFixed(2)}</p>
          )}
        </div>

        {/* Botón */}
        <button
          className="btn btn-primary add-to-cart-btn mt-auto"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;

