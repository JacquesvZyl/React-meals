import React, { useReducer } from "react";
import CartContext from "./cart-context";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      console.log({
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      });

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "CLEAR": {
      return {
        items: [],
        totalAmount: 0,
      };
    }
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

  function removeItemFromCartHandler(id) {
    dispatch({ type: "REMOVE_ITEM", id: id });
  }

  function clearCartHandler() {
    dispatch({ type: "CLEAR" });
  }
  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clear: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
