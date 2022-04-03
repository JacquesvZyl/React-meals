import { Fragment, useState } from "react";
import Header from "./components/Layout/Header/Header.component";
import Meals from "./components/Meals/Meals.component";
import Cart from "./components/Cart/Cart.component";
import CartProvider from "./store/CartProvider.component";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  function toggleCartHandler() {
    setCartIsShown((prevValue) => !prevValue);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onShowCart={toggleCartHandler} />}
      <Header onShowCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
