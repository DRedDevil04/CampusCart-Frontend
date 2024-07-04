import React from "react";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../slices/cartSlice";
import { useToast } from "@chakra-ui/react";

function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ID, img, title, category, price, email } = props;
  const toast = useToast();

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
        src={img !== null ? img : "http://localhost:5173/shop"}
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
        <button className="btn" onClick={handleAddToCart}>
          <p>Add to Cart</p>
        </button>
      </div>
    </div>
  );
}

export default Card;
