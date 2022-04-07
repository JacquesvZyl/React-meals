import React from "react";

import styles from "./OrderConfirmation.module.css";

function OrderConfirmation(props) {
  return (
    <div className={styles.confirmation}>
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
}

export default OrderConfirmation;
