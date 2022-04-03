import React, { useReducer } from "react";
import CartContext from "./cart-context";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      console.log({
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      });
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE_ITEM":
      return {};
    default:
      break;
  }
}

const initialState = {
  items: [],
  totalAmount: 0,
};

function CartProvider(props) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addItemToCartHandler(item) {
    dispatch({ type: "ADD_ITEM", item: item });
  }

  function removeItemToCartHandler(id) {
    dispatch({ type: "REMOVE_ITEM", id: id });
  }
  const cartContext = {
    items: state.items,
    totalAmount: state.amount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
