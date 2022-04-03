import React, { useContext } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numOfCartItems = cartCtx.items.reduce((prevVal, curItem) => {
    return prevVal + curItem.amount;
  }, 0);
  return (
    <button onClick={props.onShowCart} className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
