import React, { useRef, useState, forwardRef } from "react";
import "../components/styles.css";
import { IoCart } from "react-icons/io5";
import SlideShowImg from "../components/SlideShowImg";
import SlideShowModal from "../components/SlideShowModal";
import axios from "axios";

// ------------

const Product = forwardRef(function Product(props, ref) {
  let propsData = props.product;

  const inputRef = React.useRef(null);
  const minusRef = useRef(null);
  function updateButtons() {
    if (inputRef.current.value === "0") {
      minusRef.current.style.opacity = "0.5";
      minusRef.current.style.cursor = "not-allowed";
    } else {
      minusRef.current.style.opacity = "1";
      minusRef.current.style.cursor = "pointer";
    }
  }

  const cursorRef = useRef(null);
  const cursorContRef = useRef(null);

  const srcs = propsData.images;

  const [currentImg, setCurrentImg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  function nextImg() {
    setCurrentImg((currentImg + 1) % srcs.length);
  }
  function prevImg() {
    setCurrentImg(
      (currentImg - 1 < 0 ? currentImg - 1 + srcs.length : currentImg - 1) %
        srcs.length
    );
  }
  return (
    <div
      className="product"
      ref={ref}
      style={{
        transition: "all 0.5s",
        display: "",
        opacity: "1",
        position: "",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
      }}
    >
      {/* cursor custom */}{" "}
      <div ref={cursorContRef} className="customCursorCont">
        {" "}
        <div className="customCursor" ref={cursorRef}>
          View Image
        </div>
      </div>
      {/* --------slideshow modal-------------- */}
      {isVisible ? (
        <SlideShowModal
          srcs={srcs}
          currentImg={currentImg}
          setCurrentImg={setCurrentImg}
          escaping={() => setIsVisible(false)}
          isSelected={currentImg}
        />
      ) : null}
      <section className="product-page">
        {/* -----------------normal----------------- */}
        <div className="prod-img-cont">
          <div className="img-cont">
            <div
              className="prod-img"
              onMouseOver={() => {
                cursorRef.current.style.opacity = "0.9";
                cursorRef.current.style.transform = "scale(1)";
              }}
              onMouseOut={() => {
                cursorRef.current.style.transform = "scale(0)";
                cursorRef.current.style.opacity = "0";
              }}
              onMouseMove={(e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                cursorContRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
              }}
              onClick={() => {
                setIsVisible(true);
                cursorRef.current.style.transform = "scale(0)";
                cursorRef.current.style.opacity = "0";
              }}
            >
              <div className="left-arrow" onClick={prevImg}>
                ❮
              </div>
              <img src={srcs[currentImg]} alt="this" />
              <div className="right-arrow" onClick={nextImg}>
                ❯
              </div>
            </div>
            <div className="prod-img-slideshow " id="drag">
              {srcs.map((src, index) => {
                return (
                  <SlideShowImg
                    src={src}
                    alt={"this"}
                    key={index}
                    onClick={() => setCurrentImg(index)}
                    isSelected={currentImg === index}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="cont-container">
          <div className="prod-cat">{propsData.category}</div>
          <div className="prod-title">{propsData.title}</div>
          <div className="prod-desc">{propsData.description}</div>
          <div className="prod-price">
            <div className="price-top">
              <h2 className="price-main">₹{propsData.price}</h2>
              <div className="price-disc">{propsData.discountPercentage}%</div>
            </div>
            <div className="price-cut">
              ₹
              {(
                propsData.price /
                (1 - propsData.discountPercentage / 100)
              ).toFixed(2)}
            </div>
          </div>
          <div className="prod-buy-area">
            <div className="quantity">
              <button
                className="minus"
                ref={minusRef}
                onClick={function () {
                  if (inputRef.current.value > 0) {
                    inputRef.current.value =
                      parseInt(inputRef.current.value) - 1;
                  }
                  updateButtons();
                }}
              >
                &minus;
              </button>
              <input
                type="number"
                ref={inputRef}
                className="quantity-inp"
                defaultValue={"1"}
                min={"0"}
              />
              <button
                className="plus"
                onClick={function () {
                  inputRef.current.value = parseInt(inputRef.current.value) + 1;
                  updateButtons();
                }}
              >
                &#43;
              </button>
            </div>
            <div className="add-to-cart">
              <IoCart size={25} /> <span>Add to cart</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Product;
