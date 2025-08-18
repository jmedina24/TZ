import PaginatedProductList from '../subComponents/PaginatedProductsList';
import { useUser } from '../context/userContext';
import { useProducts } from '../context/productContext';
import Header from '../components/Header';

const Favorites = () => {
  const { currentUser } = useUser();
  const { products } = useProducts();

  const favoriteProducts = products.filter(product =>
    currentUser?.favorites?.includes(product.id)
  );

  return (
    <>
    <Header />
    <div className="favorites-page">
      <h2 className="my-4 mx-2">Mis Favoritos</h2>
      <PaginatedProductList products={favoriteProducts} />
    </div>
    </>
  );
};

export default Favorites;


