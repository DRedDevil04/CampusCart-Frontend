import React from "react";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, selectCarts } from "../slices/cartSlice";
import { useToast } from "@chakra-ui/react";

function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { ID, img, title, category, price, email } = props;

  const cartItems = useSelector(selectCarts);

  const isInCart = cartItems.hasOwnProperty(email) && cartItems[email].some(item => item.ID === ID);

  const handleAddToCart = () => {
    const item = { ID, title, category, price, img };
    dispatch(addItemToCart({ email, item }));
    toast({
      title: "Added to cart",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleProductClick = (ID) => {
    navigate("/product/" + ID);
  };

  return (
    <div className="card">
      <Image
        src={
          img !== null
            ? img
            : "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available"
        }
        alt="Product Image"
        id={ID}
      />
      <div
        className="card-content"
        style={{ cursor: "pointer" }}
        onClick={() => handleProductClick(ID)}
      >
        <h3 className="card-title">{title}</h3>
        <p className="card-category">{category}</p>
      </div>
      <div className="card-footer">
        <div className="price">₹{price}</div>
        {isInCart ? (
          <button className="btn" onClick={() => navigate("/cart")}>
            <p>Go to Cart</p>
          </button>
        ) : (
          <button className="btn" onClick={handleAddToCart}>
            <p>Add to Cart</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
