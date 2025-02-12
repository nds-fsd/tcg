import React from "react";
import ProductCard from "../ProductCard";
import styles from "./productlist.module.css";

const ProductList = ({ title, products, onBuy }) => {
    return (
        <div className={styles.productlist}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.grid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} onBuy={onBuy} />
                    ))
                ) : (
                    <p className={styles.noProducts}>No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;