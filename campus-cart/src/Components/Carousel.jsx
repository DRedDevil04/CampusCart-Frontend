import React, { useRef } from "react";
import "./styles.css";

function Carousel(props) {
  if (props.isInfinite) {
    setTimeout(() => {
      props.setCurrentImg((props.currentImg + 1) % props.srcs.length);
    }, props.nextTime);
  }
  return (
    <>
      <div className="img-cont-car">
        <div className="img-car">
          {props.srcs.map((src, index) => {
            if (props.currentImg === index)
              return (
                <img
                  key={index}
                  src={src}
                  alt="this"
                  draggable="false"
                  style={{ display: "inline-block" }}
                />
              );
            return <img key={index} src={src} alt="this" draggable="false" />;
          })}
        </div>
        <div className="left-arrow-car" onClick={props.prevImg}>
          ❮
        </div>
        <div className="right-arrow-car" onClick={props.nextImg}>
          ❯
        </div>
      </div>
    </>
  );
}

export default Carousel;
