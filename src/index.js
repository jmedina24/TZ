import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { ProductProvider } from './context/productContext';
import { router } from './router/index'; // O donde esté el archivo con createBrowserRouter

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ProductProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </ProductProvider>
);


