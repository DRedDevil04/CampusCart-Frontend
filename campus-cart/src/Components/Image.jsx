import React from "react";

function Image(props) {
  return (
    <>
      <div className="card-image" style={{ cursor: "pointer" }}>
        <img src={props.src} alt={props.alt} />
      </div>
    </>
  );
}

export default Image;
