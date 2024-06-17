import React from "react";
import Image from "./Image";

function Card(props) {
  return (
    <>
      <div className="card">
        <Image
          src="https://cdn.pixabay.com/photo/2020/06/16/10/30/camera-5305154_640.jpg"
          alt="Product Image"
        />
        <div className="card-content">
          <h3 className="card-title">Canon EOS R6 Mark II 24 (Black)</h3>
          <p className="card-category">Accessories</p>
        </div>
        <div className="card-footer">
          <div className="price">$500.00</div>
          <button className="btn">
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
