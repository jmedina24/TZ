import React from 'react';
import '../css/productsCard.css';
import { useUser } from '../context/userContext';

const ProductsCard = ({ product, onAddToCart }) => {
  const { currentUser, toggleFavorite, favoriteMessage } = useUser();

  const isFavorite = currentUser?.favorites?.includes(product.id);

  return (
    <div className="product-card card position-relative">
      {/* Mensaje flotante al añadir/eliminar de favoritos */}
      {favoriteMessage && (
        <div className="favorite-toast">{favoriteMessage}</div>
      )}

      {product.outOfStock && (
        <div className="stock-out-badge">PRODUCTO AGOTADO</div>
      )}

      {product.discountPercent && (
        <div className="discount-badge">
          {product.discountPercent}% OFF
        </div>
      )}

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

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>

        {product.discountPercent ? (
          <>
            <p className="price-original">${product.price.toFixed(2)}</p>
            <p className="price-discounted">
              $
              {(
                product.price *
                (1 - product.discountPercent / 100)
              ).toFixed(2)}
            </p>
          </>
        ) : (
          <p>${product.price.toFixed(2)}</p>
        )}

        <button
          className="btn btn-primary add-to-cart-btn mt-auto"
          onClick={onAddToCart}
          disabled={product.outOfStock}
        >
          {product.outOfStock ? 'Agotado' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
