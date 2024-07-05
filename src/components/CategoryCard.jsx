import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(props) {
  const navigate = useNavigate();
  function handleError(e) {
    console.log(e);
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
