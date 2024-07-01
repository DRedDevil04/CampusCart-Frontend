import React from "react";

function SlideShowImgMod(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      draggable="false"
      className={"slideshow " + (props.isSelected ? "selected" : "")}
      onClick={props.onClick}
    />
  );
}

export default SlideShowImgMod;
