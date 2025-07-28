import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/categoryOverlay.css';

const normalize = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9-]/g, "");

const CategoryOverlay = ({ isOpen, onClose, onSelectedCategory }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = useCallback((index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  }, []);

  if (!isOpen) return null;

  return (
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
                  style={{ cursor: 'pointer' }}
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
                        <Link
                          to={`/categoria/${normalize(cat.name)}/${normalize(sub.name)}`}
                          onClick={() => {
                            if (onSelectedCategory)
                              onSelectedCategory(normalize(cat.name), normalize(sub.name));
                          }}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {cat.subcategories.length === 0 && (
                  <Link
                    to={`/categoria/${normalize(cat.name)}`}
                    className="direct-link"
                    onClick={() => {
                      if (onSelectedCategory)
                        onSelectedCategory(normalize(cat.name), null);
                    }}
                  >
                    Ver productos
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryOverlay;
