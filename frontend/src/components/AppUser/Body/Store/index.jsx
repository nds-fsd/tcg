import { useState, useEffect } from 'react';
import ProductList from '../Store/ProductList';
import BalanceBar from '../Store/BalanceBar';
import { getProducts, buyChest, buyCurrency } from '../../../../lib/utils/apiStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Store/store.module.css';
import { useUser } from '../../../../context/userContext';
import ChestRewardModal from './ChestRewardModal';
import OrderHistory from '../User/Profile/OrderHistory'; //Borrar quan canviem de lloc l'OrderHistory

const Store = () => {
  const { data, updateUser } = useUser();
  const [products, setProducts] = useState([]);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [obtainedCards, setObtainedCards] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false); //Borrar quan canviem de lloc l'OrderHistory

  useEffect(() => {
    const fetchStoreData = async () => {
      const fetchedProducts = await getProducts();
      const updatedProducts = fetchedProducts.map((product) => ({
        ...product,
        canAfford:
          (product.price.pixelcoins && data?.pixelcoins >= product.price.pixelcoins) ||
          (product.price.pixelgems && data?.pixelgems >= product.price.pixelgems),
      }));

      setProducts(updatedProducts);
    };

    if (data) fetchStoreData();
  }, [data]);

  const handleBuyProduct = async (product, buyFunction, closeModal) => {
    try {
      const response = await buyFunction(product._id);
  
      if (response?.data && Array.isArray(response.data)) {
        setObtainedCards(response.data);
  
        closeModal();
  
        setTimeout(() => setIsRewardModalOpen(true), 300);
      }
  
      if (response.data?.newBalance) {
        updateUser(response.data.newBalance);
      }
  
      toast.success(`Compra realizada con éxito: ${product.name}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error('Error en la transacción. Inténtalo de nuevo.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };    

  return (
    <>
      <ToastContainer />

      <BalanceBar balance={{ pixelcoins: data?.pixelcoins, pixelgems: data?.pixelgems }} />
      <div className={styles.storeContainer}>
        {/* Borrar quan canviem de lloc l'OrderHistory*/}
        <button className={styles.toggleOrderHistory} onClick={() => setShowOrderHistory((prev) => !prev)}>
          {showOrderHistory ? 'Ocultar historial de compras' : 'Ver historial de compras'}
        </button>

        {showOrderHistory && <OrderHistory />}
        {/* Borrar quan canviem de lloc l'OrderHistory*/}
        <div className={styles.productsContainer}>
          <ProductList
            title='Cofres'
            products={products.filter((p) => p.name.toLowerCase().includes('cofre'))}
            onBuy={(product, closeModal) => handleBuyProduct(product, buyChest, closeModal)}
          />
          <ProductList
            title='Packs de Pixelgems'
            products={products.filter((p) => p.name.toLowerCase().includes('pack'))}
            onBuy={(product) => handleBuyProduct(product, buyCurrency)}
          />
        </div>
      </div>

      <ChestRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        obtainedCards={obtainedCards}
      />

    </>
  );
};

export default Store;
