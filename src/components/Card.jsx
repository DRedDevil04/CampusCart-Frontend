import React from "react";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, selectCarts } from "../slices/cartSlice";
import { useToast, Badge } from "@chakra-ui/react";

function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { ID, img, title, category, price, discount, email, available } = props;
  const discountedPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);

  const cartItems = useSelector(selectCarts);

  const isInCart =
    cartItems.hasOwnProperty(email) &&
    cartItems[email].some((item) => item.ID === ID);

  const handleAddToCart = () => {
    if (!email) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const item = { ID, title, category, price: discountedPrice, img };
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
    <div className="card" style={{ position: "relative" }}>
      <Image
        src={
          img !== null
            ? img
            : "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available"
        }
        discount={
          discount
        }
        alt="Product Image"
        id={ID}
        style={{ width: "100%", height: "auto", position: "relative" }}
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
        {available ? (
          <div className="price" style={{ position: "relative" }}>
            {discount > 0 && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "black",
                  fontSize: "0.8rem",
                  top: "-12px",
                  position: "absolute",
                }}
              >
                ₹{price.toFixed(2)}
              </span>
            )}
            <span>₹{discountedPrice}</span>
          </div>
        ) : (
          <div className="price"></div>
        )}
        {isInCart ? (
          <>
            {available ? (
              <button className="btn" onClick={() => navigate("/cart")}>
                <p>Go to Cart</p>
              </button>
            ) : (
              <button className="btn">
                <p>Out of Stock</p>
              </button>
            )}
          </>
        ) : (
          <>
            {available ? (
              <button className="btn" onClick={handleAddToCart}>
                <p>Add to Cart</p>
              </button>
            ) : (
              <button
                className="btn"
                style={{ color: "#3f72af", backgroundColor: "#f9f7f7" }}
              >
                <p style={{ fontWeight: "700", fontSize: "1rem" }}>
                  Out of Stock
                </p>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
