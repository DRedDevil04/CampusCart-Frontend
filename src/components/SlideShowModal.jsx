import React, { useRef } from "react";
import PropTypes from "prop-types";
import SlideShowImgMod from "./SlideShowImgMod";
import "./styles.css";
import { IoIosCloseCircle } from "react-icons/io";

function SlideShowModal(props) {
  const slideshowImgRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorContRef = useRef(null);
  function handleError(e) {
    e.target.src =
      "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available";
  }
  return (
    <>
      {/* custom cursor left */}
      <div ref={cursorContRef} className="customCursorCont">
        <div className="customCursor" ref={cursorRef}></div>
      </div>
      <div className="modal" id="modal">
        <div className="img-cont-mod">
          <div className="close" onClick={props.escaping}>
            <IoIosCloseCircle />
          </div>
          <div
            className="prod-img-mod"
            ref={slideshowImgRef}
            onMouseMove={(e) => {
              const mouseX = e.clientX;
              const mouseY = e.clientY;

              cursorRef.current.style.transform = "scale(1)";
              cursorRef.current.style.opacity = "1";
              cursorRef.current.style.fontSize = "2rem";
              cursorContRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

              if (
                mouseX <
                slideshowImgRef.current.getBoundingClientRect().x +
                  slideshowImgRef.current.offsetWidth / 2
              ) {
                cursorRef.current.innerHTML = "❮";
              } else {
                cursorRef.current.innerHTML = "❯";
              }
            }}
            onMouseLeave={() => {
              cursorRef.current.style.transform = "scale(0)";
              cursorRef.current.style.opacity = "0";
            }}
            onClick={(e) => {
              cursorRef.current.style.transform = "scale(0)";
              cursorRef.current.style.opacity = "0";
              const mouseX = e.clientX;
              if (
                mouseX <
                slideshowImgRef.current.getBoundingClientRect().x +
                  slideshowImgRef.current.offsetWidth / 2
              ) {
                props.setCurrentImg(
                  (props.currentImg - 1 < 0
                    ? props.currentImg - 1 + props.srcs.length
                    : props.currentImg - 1) % props.srcs.length
                );
              } else {
                props.setCurrentImg((props.currentImg + 1) % props.srcs.length);
              }
            }}
          >
            <img
              src={props.srcs[props.currentImg]}
              alt="this"
              draggable="false"
              onError={handleError}
            />
          </div>
          <div className="prod-img-slideshow-mod" id="drag">
            {props.srcs.map((src, index) => {
              return (
                <SlideShowImgMod
                  src={src}
                  alt={"this"}
                  key={index}
                  onClick={() => props.setCurrentImg(index)}
                  isSelected={props.currentImg === index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

SlideShowModal.propTypes = {
  escaping: PropTypes.func.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
  currentImg: PropTypes.number.isRequired,
  srcs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SlideShowModal;
