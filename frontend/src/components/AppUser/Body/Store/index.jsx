import React, { useState, useEffect } from 'react';
import ProductList from '../Store/ProductList';
import BalanceBar from '../Store/BalanceBar';
import { getProducts, buyChest, buyCurrency } from '../../../../lib/utils/apiStore';
import { toast } from 'react-toastify';
import styles from '../Store/store.module.css';
import { useUser } from '../../../../context/userContext';
import OrderHistory from '../User/Profile/OrderHistory'; //Borrar quan canviem de lloc l'OrderHistory

const Store = () => {
  const { data, updateUser } = useUser();
  const [products, setProducts] = useState([]);
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

  const handleBuyProduct = async (product, buyFunction) => {
    const result = await buyFunction(product._id);

    if (result) {
      toast.success('Compra realizada con éxito');
      updateUser();
    } else {
      toast.error('Error al comprar el producto');
    }
  };

  return (
    <>
      <BalanceBar balance={{ pixelcoins: data?.pixelcoins, pixelgems: data?.pixelgems }} />
      <div className={styles.storeContainer}>
        {/* Borrar quan canviem de lloc l'OrderHistory*/}
        <button className={styles.toggleOrderHistory} onClick={() => setShowOrderHistory((prev) => !prev)}>
          {showOrderHistory ? 'Ocultar historial de compras' : 'Ver historial de compras'}
        </button>

        {showOrderHistory && <OrderHistory />}
        {/* Borrar quan canviem de lloc l'OrderHistory*/}

        <ProductList
          title='Cofres'
          products={products.filter((p) => p.name.toLowerCase().includes('cofre'))}
          onBuy={(product) => handleBuyProduct(product, buyChest)}
        />
        <ProductList
          title='Packs de Pixelcoins'
          products={products.filter((p) => p.name.toLowerCase().includes('pack'))}
          onBuy={(product) => handleBuyProduct(product, buyCurrency)}
        />
      </div>
    </>
  );
};

export default Store;
