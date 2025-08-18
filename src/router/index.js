import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import CategoryPage from '../pages/CategoryPage';
import ErrorViewer from "../pages/ErrorViewer";
import OffersPage from "../pages/OffersPage";
import BestSellersPage from "../pages/BestSellersPage";
import ContactForm from "../pages/ContactForm";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import PurchasesList from "../subComponents/PurchasesList";

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
    {
        path: '/contact',
        element: <ContactForm />,
        errorElement: <ErrorViewer />,
    },
    {
        path: '/favorites',
        element: <Favorites />,
        errorElement: <ErrorViewer />,
    },
    {
        path: '/profile',
        element: <Profile />,
        errorElement: <ErrorViewer />,
    },
    {
        path: '/purchases',
        element: <PurchasesList />,
        errorElement: <ErrorViewer />,
    },
]);