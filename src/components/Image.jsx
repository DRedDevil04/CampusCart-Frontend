import React from "react";
import { useNavigate } from "react-router-dom";

function Image(props) {
  const navigate = useNavigate();

  function handler(id) {
    console.log("clicked");
    navigate("/product/" + id);
  }

  return (
    <>
      <div
        className="card-image"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handler(props.id);
        }}
      >
        <img src={props.src} alt={props.alt} />
      </div>
    </>
  );
}

export default Image;
