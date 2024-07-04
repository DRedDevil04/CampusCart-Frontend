import React from "react";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../slices/cartSlice";

function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ID, img, title, category, price, email } = props;

  const handleAddToCart = () => {
    const item = { ID, title, category, price, img };
    dispatch(addItemToCart({ email, item }));
  };

  const handleProductClick = (ID) => {
    navigate("/product/" + ID);
  };

  return (
    <div className="card">
      <Image src={img} alt="Product Image" id={ID} />
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
