import React from "react";

function SlideShowImg(props) {
  function handleError(e) {
    console.log(e);
    e.target.src =
      "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available";
  }
  return (
    <img
      src={props.src}
      alt={props.alt}
      draggable="false"
      className={"slideshow " + (props.isSelected ? "selected" : "")}
      onClick={props.onClick}
      onError={handleError}
    />
  );
}

export default SlideShowImg;
