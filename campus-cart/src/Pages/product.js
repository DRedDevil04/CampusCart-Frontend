import React, { useRef, useState } from "react";
import "./styles.css";
import { IoCart } from "react-icons/io5";
import SlideShowImg from "./SlideShowImg";
import SlideShowModal from "./SlideShowModal";

// ------------

function App(props) {
  var discountAmt = 90; //TODO: change it to props.discountAmt

  const inputRef = useRef(null);
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

  const srcs = [
    "https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg",
    "https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651",
    "https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png",
    "https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj",
    "https://cdn.shopify.com/s/files/1/1859/8979/files/image17_3cfc7cfb-8215-40b7-a297-db7285d5375b.png?v=1610384290",
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  ];

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
    <>
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
              onMouseOver={(e) => {
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
          <div className="prod-cat">Sneaker Company</div>
          <div className="prod-title">Fall Limited Edition Sneakers</div>
          <div className="prod-desc">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </div>
          <div className="prod-price">
            <div className="price-top">
              <h2 className="price-main">${(250 - discountAmt).toFixed(2)}</h2>
              <div className="price-disc">{(discountAmt / 250) * 100}%</div>
            </div>
            <div className="price-cut">$250.00</div>
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
            <script src={require("../script")}></script>
            <div className="add-to-cart">
              <IoCart size={25} /> <span>Add to cart</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
