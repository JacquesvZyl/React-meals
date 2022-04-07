import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal/Modal.component";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem.component";
import Checkout from "./Checkout";
import useHTTP from "../../hooks/useHTTP";
import Loading from "../UI/loading/Loading.component";
import OrderConfirmation from "./OrderConfirmation.component";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const { error, isLoading, sendRequest, didSubmit } = useHTTP();
  const hasItems = cartCtx.items.length > 0;

  didSubmit && cartCtx.clear();

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }
  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  function orderHandler() {
    setIsCheckout(true);
  }

  function submitOrderHandler(userData) {
    //  method, headers, body
    sendRequest({
      url: process.env.REACT_APP_DB_ORDERS_URL,
      method: "POST",
      body: { user: userData, orderedItems: cartCtx.items },
    });
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={props.onShowCart} className={styles["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={styles.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onShowCart} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <div>
      <h3>Thank you for ordering!</h3>
      <p>
        We have received your order and will deliver it to your door as soon as
        we can!
      </p>
      <div className={styles.actions}>
        <button onClick={props.onShowCart} className={styles.button}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <Modal onClick={props.onShowCart}>
      {isLoading && <Loading text={"Submitting order..."} color={"#892B06"} />}
      {!isLoading && !didSubmit && cartModalContent}
      {didSubmit && <OrderConfirmation onShowCart={props.onShowCart} />}
    </Modal>
  );
}

export default Cart;
