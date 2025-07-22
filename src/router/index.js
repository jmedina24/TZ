import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ErrorViewer from "../pages/ErrorViewer";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorViewer />,
    },
    {
        path: '/categoria/:categoria/:subcategoria',
        element: <CategoryPage />,
        errorElement: <ErrorViewer />,
  }
]);