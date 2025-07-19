import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([])
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {error && <div className="cart-error">{error}</div>}
      <ul className="cart-list">
      {cart &&
        cart.map(
          (value) =>
            value.qty > 0 && (
              <li key={value._id} className="cart-item">
                {value.productName}-{value.price}-
                <button className="cart-btn" onClick={() => decrement(value._id, value.qty)}>
                  -
                </button>
                <span className="cart-qty">{value.qty}</span>
                <button className="cart-btn" onClick={() => increment(value._id, value.qty)}>
                  +
                </button>
                -<span className="cart-item-total">{value.price * value.qty}</span>
              </li>
            )
        )}
      </ul>
      <h5 className="cart-order-value">Order Value:{orderValue}</h5>
      <p>
        {user?.token ? (
          <button className="cart-place-btn" onClick={placeOrder}>Place Order</button>
        ) : (
          <button className="cart-login-btn" onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p>
    </div>
  );
}
