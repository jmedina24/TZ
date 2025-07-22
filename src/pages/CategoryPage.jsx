import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const normalize = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9-]/g, '');
};

const ITEMS_POR_PAGINA = 10; // 2 columnas x 5 filas

const CategoryPage = () => {
  const { categoria, subcategoria } = useParams();
  const [paginaActual, setPaginaActual] = useState(1);

  const productosFiltrados = products.filter(product => {
    const productCategory = normalize(product.category);
    const productSubcategory = normalize(product.subcategory);

    return (
      productCategory === categoria.toLowerCase() &&
      productSubcategory === subcategoria.toLowerCase()
    );
  });

  // Calcular los productos de la página actual
  const indiceUltimo = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimero = indiceUltimo - ITEMS_POR_PAGINA;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);

  const cambiarPagina = (numPagina) => {
    if (numPagina >= 1 && numPagina <= totalPaginas) {
      setPaginaActual(numPagina);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">
        Resultados de la búsqueda para: {subcategoria.replace(/-/g, ' ')}
      </h4>

      <div className="row">
        {productosPagina.length === 0 ? (
          <p>No hay productos que coincidan con su búsqueda.</p>
        ) : (
          productosPagina.map(producto => (
            <div className="col-6 col-md-4 mb-4" key={producto.id}>
              <div className="card h-100">
                <img
                  src={producto.image}
                  className="card-img-top"
                  alt={producto.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">${producto.price}</h5>
                  <p className="card-text">{producto.name}</p>
                  <button className="btn btn-primary mt-3">Agregar al carrito</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>
                Anterior
              </button>
            </li>
            {[...Array(totalPaginas)].map((_, i) => (
              <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => cambiarPagina(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CategoryPage;
