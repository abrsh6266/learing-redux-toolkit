import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "./features/cart/cartSlice";
import Modal from "./components/Modal";
function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
