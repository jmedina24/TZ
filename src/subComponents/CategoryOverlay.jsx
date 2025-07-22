import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/categoryOverlay.css';

const CategoryOverlay = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    isOpen && (
      <div className="overlay">
        <div className="overlay-content">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2>Categorías</h2>
          <ul className="category-list">
            {categories.map((cat, index) => {
              const isOpenCat = openIndex === index;
              return (
                <li key={cat.name}>
                  <div
                    className={`category-title ${isOpenCat ? 'active' : ''}`}
                    onClick={() => toggleIndex(index)}
                  >
                    {cat.name}
                    {cat.subcategories.length > 0 && (
                      <i className={`bi ${isOpenCat ? 'bi-chevron-up' : 'bi-chevron-down'} arrow`}></i>
                    )}
                  </div>

                  {isOpenCat && cat.subcategories.length > 0 && (
                    <ul className="subcategory-list">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <Link to={sub.path} onClick={onClose}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cat.subcategories.length === 0 && (
                    <Link to={cat.path} className="direct-link" onClick={onClose}>
                      Ver productos
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
};

export default CategoryOverlay;

