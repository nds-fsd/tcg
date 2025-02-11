import React, { useState, useEffect } from "react";
import ProductList from "../Store/ProductList";
import BalanceBar from "../Store/BalanceBar";
import { getProducts, buyChest, buyCurrency } from '../../../../lib/utils/apiStore';
import { toast } from 'react-toastify';
import styles from '../Store/store.module.css';
import { useUser } from "../../../../context/userContext";

const Store = () => {
  const { data } = useUser();
  const [products, setProducts] = useState([]);

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

  const handleBuyProduct = async (product) => {
    const result = await buyChest(product._id);

    if (result) {
      toast.success("Compra realizada con éxito");
    } else {
      toast.error("Error al comprar el producto");
    }
  };

  return (
    <>
      <BalanceBar balance={{ pixelcoins: data?.pixelcoins, pixelgems: data?.pixelgems }} />
      <div className={styles.storeContainer}>
        <ProductList
          title="Cofres"
          products={products.filter((p) => p.name.toLowerCase().includes("cofre"))}
          onBuy={(product) => handleBuyProduct(product, buyChest)}
        />
        <ProductList
          title="Packs de Pixelcoins"
          products={products.filter((p) => p.name.toLowerCase().includes("pack"))}
          onBuy={(product) => handleBuyProduct(product, buyCurrency)}
        />
      </div>
    </>
  );
};

export default Store;