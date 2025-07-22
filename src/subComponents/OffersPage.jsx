import React from 'react'
import { useNavigate } from 'react-router-dom';
import {products} from '../data/products';
import '../css/offersPage.css';
import Header from '../components/Header';

const OffersPage = ({ onAddToCart }) => {
    const navigate = useNavigate();

    const offerProducts = products.filter(p => p.discountPercent && p.discountPercent > 0);

    const getDiscountPrice = (price, percent) => {
        return (price - (price * percent / 100).toFixed(2));
    };

    const handleCardClick = (id) => {
        navigate(`/producto/${id}`);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Evita la activación de la navegación
        if (onAddToCart) {
            onAddToCart(product);
        }else{
            console.log(`Producto que se agregaría: ${product}`);
        }
    };

  return (
    <>
    <Header />
    <div className='container mt-4'>
        <h2 className='mb-4'>Ofertas</h2>
        <div className='row'>
            {offerProducts.map(product => (
                <div className='col-6 col-md-3 mb-4' key={product.id} onClick={() => handleCardClick(product.id)} style={{cursor: 'pointer'}}>
                    <div className='card h-100 position-relative'>
                        {/* Badge de descuento */}
                        <span className='position-absolute top-0 end-0 bg-danger text-white px-2 py-1 rounded-start'>
                            {product.discountPercent}% OFF
                        </span>

                        <img
                            src={product.image}
                            className='card-img-top img-fixed'
                            alt={product.name}
                        />

                        <div className='card-body d-flex flex-column justify-content-between'>
                            <h6 className='card-title'>{product.name}</h6>
                            <div className='mt-2'>
                                <p className='card-text mb-1'>
                                    <span className='text-muted text-decoration-line-through'>
                                        ${product.price}
                                    </span>
                                </p>
                                <p className='card-text text-danger fw-bold fs-5'>
                                    ${getDiscountPrice(product.price, product.discountPercent)}
                                </p>
                                <div className='d-flex justify-content-center mt-2'>
                                <button 
                                    className='btn btn-sm btn-primary mt-2'
                                    onClick={(e) => handleAddToCart(e, product)}>
                                        Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            ))}

            {offerProducts.length === 0 && (
                <div className='col-12'>
                    <p className='text-center'>No hay productos en oferta en este momento...</p>
                </div>
            )}
        </div>
    </div>
    </>
  )
}

export default OffersPage