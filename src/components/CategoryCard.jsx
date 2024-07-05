import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(props) {
  const navigate = useNavigate();
  function handleError(e) {
    e.target.src =
      "https://icons.veryicon.com/png/o/miscellaneous/fangshan-design_icon/category-18.png";
  }

  return (
    <div
      className="category-card"
      onClick={() => navigate("/category/" + props.category.toLowerCase())}
    >
      <img alt="this" draggable="false" src={props.url} onError={handleError} />
      <div>{props.category}</div>
    </div>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
