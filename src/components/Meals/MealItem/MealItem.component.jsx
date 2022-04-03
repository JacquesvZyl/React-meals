import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm.component";
import CartContext from "../../../store/cart-context";
function Meal(props) {
  const { title, description } = props;
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  function addTocartHandler(amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.title,
      amount: amount,
      price: props.price,
    });
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{title}</h3>
        <div>{description}</div>
        <div>{price}</div>
      </div>
      <div>
        <MealItemForm addTocart={addTocartHandler} />
      </div>
    </li>
  );
}

export default Meal;
