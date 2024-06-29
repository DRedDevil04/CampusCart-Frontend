import React from "react";
import Image from "./Image";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  const handler = (id) => {
    console.log("clicked");
    navigate("/product/" + id);
  };
  return (
    <>
      <div className="card">
        <Image
          src={props.img}
          alt="Product Image"
          href="google.com"
          id={props.id}
        />
        <div
          className="card-content"
          style={{ cursor: "pointer" }}
          onClick={() => {
            handler(props.id);
          }}
        >
          <h3 className="card-title">{props.title}</h3>
          <p className="card-category">{props.category}</p>
        </div>
        <div className="card-footer">
          <div className="price">₹{props.price}</div>
          <button className="btn">
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
