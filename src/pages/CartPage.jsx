import Cart from "../components/cart";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
const CartPage = ({onOpen,isOpen,onClose,btnRef}) => {
  return (
    <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <Cart />
    </>
  )
}

export default CartPage