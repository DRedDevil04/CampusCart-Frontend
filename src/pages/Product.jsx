import React, { useRef, useState, forwardRef } from "react";
import "../components/styles.css";
import { IoCart, IoArrowBackCircle } from "react-icons/io5";
import SlideShowImg from "../components/SlideShowImg";
import SlideShowModal from "../components/SlideShowModal";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, selectCarts } from "../slices/cartSlice";
import { selectUser } from "../slices/authSlice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Product = forwardRef(function Product(props, ref) {
  let propsData = props.product;
  const discountedPrice =propsData.price.discount.percentage > 0 ? (propsData.price.amount * (1 - propsData.price.discount.percentage / 100)).toFixed(2) : propsData.price.amount.toFixed(2);

  const userInfo = useSelector(selectUser);
  const email = userInfo?.email;
  const { onOpen, isOpen, onClose, btnRef } = props;
  const item = {
    ID: props.product._id,
    title: props.product.name,
    category: props.product.category.name,
    price: discountedPrice,
    img:
      props.product.images.length > 0
        ? props.product.images[0].url
        : "https://placehold.co/400",
  };
  const toast = useToast();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const minusRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorContRef = useRef(null);

  const srcs = propsData.images;
  const [currentImg, setCurrentImg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!email) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const quantity = parseInt(inputRef.current.value);
    for (let i = 0; i < quantity; i++) {
      dispatch(addItemToCart({ email, item }));
    }
    toast({
      title: "Added to cart",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const cartItems = useSelector(selectCarts);
  const isInCart = cartItems.hasOwnProperty(email)
    ? cartItems[email].some((cartItem) => cartItem.ID === item.ID)
    : false;

  const goToCart = () => {
    navigate("/cart");
  };

  function updateButtons() {
    if (inputRef.current.value === "0") {
      minusRef.current.style.opacity = "0.5";
      minusRef.current.style.cursor = "not-allowed";
    } else {
      minusRef.current.style.opacity = "1";
      minusRef.current.style.cursor = "pointer";
    }
  }

  function nextImg() {
    setCurrentImg((currentImg + 1) % srcs.length);
  }

  function prevImg() {
    setCurrentImg(
      (currentImg - 1 < 0 ? currentImg - 1 + srcs.length : currentImg - 1) %
        srcs.length
    );
  }

  function handleError(e) {
    e.target.src =
      "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available";
  }

  return (
    <>
      <Header onOpen={onOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
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
        {/* cursor custom */}
        <div ref={cursorContRef} className="customCursorCont">
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
          <div className="prod-back-shop" onClick={() => history.back()}>
            <IoArrowBackCircle /> <div>Go back</div>
          </div>
          {/* -----------------normal----------------- */}
          <div className="prod-img-cont" autoFocus={true}>
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
                <img
                  src={srcs[currentImg].url}
                  alt="this"
                  onError={handleError}
                />
                <div className="right-arrow" onClick={nextImg}>
                  ❯
                </div>
              </div>
              <div className="prod-img-slideshow " id="drag">
                {srcs.map((src, index) => {
                  return (
                    <SlideShowImg
                      src={src.url}
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
            <div className="prod-cat">{propsData.category.name}</div>
            <div className="prod-title">{propsData.name}</div>
            <div className="prod-desc">{propsData.description}</div>
            {propsData.available ? (
              <div className="prod-price">
                <div className="price-top">
                  <h2 className="price-main">
                    ₹
                    {discountedPrice}
                  </h2>
                  {propsData.price.discount.percentage > 0 ? (
                    <div className="price-disc">
                      {propsData.price.discount.percentage}%
                    </div>
                  ) : null}
                </div>

                {propsData.price.discount.percentage > 0 ? (
                  <div className="price-cut">₹{propsData.price.amount}</div>
                ) : null}
              </div>
            ) : (
              <div className="prod-price"></div>
            )}
            <div className="prod-buy-area">
              {!isInCart && propsData.available && (
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
                    autoFocus={false}
                  >
                    &minus;
                  </button>
                  <input
                    type="number"
                    ref={inputRef}
                    className="quantity-inp"
                    defaultValue={"1"}
                    min={"0"}
                    autoFocus={false}
                  />
                  <button
                    className="plus"
                    onClick={function () {
                      inputRef.current.value =
                        parseInt(inputRef.current.value) + 1;
                      updateButtons();
                    }}
                    autoFocus={false}
                  >
                    &#43;
                  </button>
                </div>
              )}
              {isInCart ? (
                <div className="add-to-cart">
                  {propsData.available ? (
                    <div
                      className="add-to-cart-btn"
                      onClick={() => {
                        navigate("/cart");
                      }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <IoCart size={25} />
                      <span style={{ marginLeft: "5px" }}>View in cart</span>
                    </div>
                  ) : (
                    <div
                      className="add-to-cart-btn"
                      onClick={goToCart}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <IoCart size={25} />
                      <span style={{ marginLeft: "5px" }}>Go to Cart</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="add-to-cart">
                  {propsData.available ? (
                    <div
                      className="add-to-cart-btn"
                      onClick={handleAddToCart}
                      style={{ display: "flex", alignItems: "center" }}
                      autoFocus={false}
                    >
                      <IoCart size={25} />
                      <span style={{ marginLeft: "5px" }}>Add to Cart</span>
                    </div>
                  ) : (
                    <div
                      className="add-to-cart-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      autoFocus={false}
                    >
                      <span
                        style={{
                          marginLeft: "5px",
                          fontWeight: "800",
                        }}
                      >
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

Product.propTypes = {
  product: PropTypes.object.isRequired,
  btnRef: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isCategory: PropTypes.bool,
  isSearched: PropTypes.bool,
  categories: PropTypes.array,
};

export default Product;
