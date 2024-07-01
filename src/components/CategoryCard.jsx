import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(props) {
  const navigate = useNavigate();
  return (
    <div
      className="category-card"
      onClick={() => navigate("/category/" + props.category.toLowerCase())}
    >
      <img alt="this" draggable="false" src={props.url} />
      <div>{props.category}</div>
    </div>
  );
}
