import React, { useState, useEffect } from 'react';
import ProductList from '../Store/ProductList';
import BalanceBar from '../Store/BalanceBar';
import { getProducts, buyChest, buyCurrency } from '../../../../lib/utils/apiStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    try {
      const newBalance = await buyFunction(product._id);

      if (newBalance) {
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

        updateUser(newBalance);
      } else {
        toast.error(`No se pudo completar la compra de ${product.name}.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error en la transacción. Inténtalo de nuevo.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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
            onBuy={(product) => handleBuyProduct(product, buyChest)}
          />
          <ProductList
            title='Packs de Pixelgems'
            products={products.filter((p) => p.name.toLowerCase().includes('pack'))}
            onBuy={(product) => handleBuyProduct(product, buyCurrency)}
          />
        </div>
      </div>
    </>
  );
};

export default Store;
