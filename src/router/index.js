import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ErrorViewer from "../pages/ErrorViewer";
import OffersPage from "../pages/OffersPage";
import BestSellersPage from "../pages/BestSellersPage";

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
    },
    {
        path: '/offers',
        element: <OffersPage />,
        errorElement: <ErrorViewer />,
    },
    {
        path: '/bestsellers',
        element: <BestSellersPage />,
        errorElement: <ErrorViewer />,
    },
]);