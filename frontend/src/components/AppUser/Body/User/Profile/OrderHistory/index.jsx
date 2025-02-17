import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../../../../../lib/utils/apiOrder';
import styles from './orderhistory.module.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getUserOrders();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p className={styles.loading}> Cargando historial de compras...</p>;

  return (
    <div className={styles.orderHistory}>
      <h2>Historial de Compras</h2>
      {orders.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Saldo previo</th>
              <th>Saldo posterior</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {new Date(order.createdAt).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td>
                  {order.products.map((product) => (
                    <div key={product.productId}>{product.name}</div>
                  ))}
                </td>
                <td>
                  {order.totalPrice.pixelcoins > 0 && (
                    <span className={styles.priceItem}>
                      <img
                        src='https://res.cloudinary.com/dsd7efrba/image/upload/v1739100321/moneda3tcg_hmxpum.png'
                        alt='Pixelcoins'
                        className={styles.coinIcon}
                      />
                      {order.totalPrice.pixelcoins}
                    </span>
                  )}
                  {order.totalPrice.pixelgems > 0 && (
                    <span className={styles.priceItem}>
                      <img
                        src='https://res.cloudinary.com/dsd7efrba/image/upload/v1739100320/gema4tcg_laiqk5.png'
                        alt='Pixelgems'
                        className={styles.gemIcon}
                      />
                      {order.totalPrice.pixelgems}
                    </span>
                  )}
                </td>
                <td>
                  {order.previousBalance.pixelcoins > 0 && (
                    <span className={styles.balanceItem}>
                      <img
                        src='https://res.cloudinary.com/dsd7efrba/image/upload/v1739100321/moneda3tcg_hmxpum.png'
                        alt='Pixelcoins'
                        className={styles.coinIcon}
                      />
                      {order.previousBalance.pixelcoins}
                    </span>
                  )}
                  {order.previousBalance.pixelgems > 0 && (
                    <span className={styles.balanceItem}>
                      <img
                        src='https://res.cloudinary.com/dsd7efrba/image/upload/v1739100320/gema4tcg_laiqk5.png'
                        alt='Pixelgems'
                        className={styles.gemIcon}
                      />
                      {order.previousBalance.pixelgems}
                    </span>
                  )}
                </td>
                <td>
                  {order.newBalance.pixelcoins > 0 && (
                    <span className={styles.balanceItem}>
                      <img
                        src='https://res.cloudinary.com/dsd7efrba/image/upload/v1739100321/moneda3tcg_hmxpum.png'
                        alt='Pixelcoins'
                        className={styles.coinIcon}
                      />
                      {order.newBalance.pixelcoins}
                    </span>
                  )}
                  {order.newBalance.pixelgems > 0 && (
                    <span className={styles.balanceItem}>
                      <img
                        src='https://res.cloudinary.com/dsd7efrba/image/upload/v1739100320/gema4tcg_laiqk5.png'
                        alt='Pixelgems'
                        className={styles.gemIcon}
                      />
                      {order.newBalance.pixelgems}
                    </span>
                  )}
                </td>
                <td className={order.status === 'completada' ? styles.completed : styles.failed}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
