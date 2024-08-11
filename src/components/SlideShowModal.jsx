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
          <div className="prod-img-mod" ref={slideshowImgRef}>
            <img
              src={props.srcs[props.currentImg].url}
              alt="this"
              draggable="false"
              onError={handleError}
            />
          </div>
          <div className="prod-img-slideshow-mod" id="drag">
            {props.srcs.map((src, index) => {
              return (
                <SlideShowImgMod
                  src={src.url}
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
