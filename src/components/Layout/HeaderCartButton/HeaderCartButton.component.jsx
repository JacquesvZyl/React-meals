import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cart-context";

function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numOfCartItems = cartCtx.items.reduce((prevVal, curItem) => {
    return prevVal + curItem.amount;
  }, 0);

  useEffect(() => {
    if (numOfCartItems === 0) return;
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [numOfCartItems]);

  return (
    <button
      onClick={props.onShowCart}
      className={`${styles.button} ${btnIsHighlighted ? styles.bump : ""}`}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles["button-text"]}>Your Cart</span>
      <span className={styles.badge}>{numOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
