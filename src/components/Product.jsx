import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
      toast.success("Added to cart!");
    }
    else{
      toast.info("Already in cart");
    }
  };
  return (
    <div className="product-list-container">
      {products &&
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imgUrl} width={100} className="product-img"/>
            <h3 className="product-title">{product.productName}</h3>
            <p className="product-desc">{product.description}</p>
            <h4 className="product-price">{product.price}</h4>
            <button className="product-add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
    </div>
  );
}
