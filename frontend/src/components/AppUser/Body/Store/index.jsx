import styles from '../Store/store.module.css';
import ProductList from '../Store/ProductList';
import BalanceBar from '../Store/BalanceBar';
import ChestRewardModal from './ChestRewardModal';
import { useState, useEffect } from 'react';
import { useUser } from '../../../../context/userContext';
import { getProducts, buyChest, buyCurrency } from '../../../../lib/utils/apiStore';
import { successToast, errorToast } from '../../../../lib/toastify/toast';

const Store = () => {
  const { data, updateUser } = useUser();
  const [products, setProducts] = useState([]);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [obtainedCards, setObtainedCards] = useState([]);

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

      if (response) {
        setObtainedCards(response.obtainedCards);
        closeModal();
        setTimeout(() => setIsRewardModalOpen(true), 300);
      }

      if (response.data?.newBalance) {
        updateUser(response.data.newBalance);
      }

      successToast('Compra realizada con éxito');
    } catch (e) {
      if (e.status === 400) {
        errorToast('Solicitud incorrecta');
      } else if (e.status === 404) {
        errorToast('Algun recurso no se ha encontrado o no esta disponible');
      } else if (e.status === 410) {
        errorToast('Saldo insuciciente');
      } else {
        errorToast('Interno del servidor');
      }
    }
  };

  return (
    <>
      <BalanceBar balance={{ pixelcoins: data?.pixelcoins, pixelgems: data?.pixelgems }} />
      <div className={styles.storeContainer}>
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
