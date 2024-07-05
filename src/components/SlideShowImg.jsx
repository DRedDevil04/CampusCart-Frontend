import React from "react";
import PropTypes from "prop-types";

function SlideShowImg(props) {
  function handleError(e) {
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

SlideShowImg.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SlideShowImg;
