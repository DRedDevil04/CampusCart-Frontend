import React from "react";
import { useNavigate } from "react-router-dom";

function CardImage(props) {
  const navigate = useNavigate();
  //console.log(props);
  var src = props.src;

  function handler(id) {
    console.log("clicked");
    navigate("/product/" + id);
  }
  function imageExists(image_url) {
    var imgg = new Image();
    imgg.src = image_url;
    imgg.onload = function () {
      return true;
    };
    imgg.onerror = function (e) {
      return false;
    };
    return imgg.complete;
  }
  if (!imageExists(src)) {
    src = "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available";
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
        <img src={src} alt={props.alt} />
      </div>
    </>
  );
}

export default CardImage;
