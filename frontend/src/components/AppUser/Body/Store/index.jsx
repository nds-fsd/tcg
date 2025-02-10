import React, { useState, useEffect } from "react";
import ProductList from "../Store/ProductList";
import BalanceBar from "../Store/BalanceBar";
import { getProducts, buyChest, buyCurrency } from '../../../../lib/utils/apiStore';
import { toast } from 'react-toastify';
import styles from '../Store/store.module.css';

// const getUserIdFromToken = () => {agafar ID de l'usuari a través del seu token i decodificar-lo per obtenir-lo.}

const userId = "67a905c1761d599159d8c976";

//const Store = () => {
    // const userId = getUserIdFromToken();

    const Store = () => {
        const [products, setProducts] = useState([]);
        const [balance, setBalance] = useState({ pixelcoins: 0, pixelgems: 0 });
      
        useEffect(() => {
          const fetchStoreData = async () => {
            const fetchedProducts = await getProducts();
            const userResponse = await fetch(`http://localhost:3001/user/${userId}`);
            const userData = await userResponse.json();
      
            const updatedProducts = fetchedProducts.map((product) => ({
              ...product,
              canAfford:
                (product.price.pixelcoins && userData.pixelcoins >= product.price.pixelcoins) ||
                (product.price.pixelgems && userData.pixelgems >= product.price.pixelgems),
            }));
      
            setProducts(updatedProducts);
            setBalance({ pixelcoins: userData.pixelcoins, pixelgems: userData.pixelgems });
          };
      
          fetchStoreData();
        }, []);
      
        const handleBuyChest = async (product) => {
          const token = localStorage.getItem("token");
      
          if (!token) {
              toast.error("No estás autenticado. Por favor, inicia sesión.");
              return;
          }
      
          const result = await buyChest(product._id, token);
      
          if (result) {
              toast.success("Compra realizada con éxito");
      
              try {
                  const userResponse = await fetch(`http://localhost:3001/user/${userId}`, {
                      headers: { Authorization: `Bearer ${token}` },
                  });
                  const userData = await userResponse.json();
      
                  setBalance({
                      pixelcoins: userData.pixelcoins,
                      pixelgems: userData.pixelgems,
                  });
              } catch (error) {
                  toast.error("No se pudo actualizar el saldo.");
              }
          } else {
              toast.error("Error al comprar el producto");
          }
      };      

      const handleBuyCurrency = async (product) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            toast.error("No estás autenticado. Por favor, inicia sesión.");
            return;
        }
    
        const result = await buyCurrency(product._id, token);
    
        if (result) {
            toast.success("Compra realizada con éxito");
    
            try {
                const userResponse = await fetch(`http://localhost:3001/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userData = await userResponse.json();
    
                setBalance({
                    pixelcoins: userData.pixelcoins,
                    pixelgems: userData.pixelgems,
                });
            } catch (error) {
                toast.error("No se pudo actualizar el saldo.");
            }
        } else {
            toast.error("Error al comprar el producto");
        }
    };    

        return (
          <>
            <BalanceBar balance={balance} />
            <div className={styles.storeContainer}>
              <ProductList
                title="Cofres"
                products={products.filter((p) => p.name.toLowerCase().includes("cofre"))}
                onBuy={handleBuyChest}
              />
              <ProductList
                title="Packs de Pixelcoins"
                products={products.filter((p) => p.name.toLowerCase().includes("pack"))}
                onBuy={handleBuyCurrency}
              />
            </div>
          </>
        );
};

export default Store;