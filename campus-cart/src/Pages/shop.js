import React, { useState, useRef } from "react";
import "../Components/styles.css";
import Card from "../Components/Card";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import AddProd from "../Components/AddProd";
import { useNavigate } from "react-router-dom";
import Carousel from "../Components/Carousel";

function App(props) {
  var isAdmin = true; // TODO: adding props.isAdmin
  var [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  //----------------- carousel -------------------------
  const srcs = [
    "https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg",
    "https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651",
    "https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png",
    "https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj",
    "https://cdn.shopify.com/s/files/1/1859/8979/files/image17_3cfc7cfb-8215-40b7-a297-db7285d5375b.png?v=1610384290",
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  ];

  const [currentImg, setCurrentImg] = useState(0);
  function nextImg() {
    console.log("next");
    setCurrentImg((currentImg + 1) % srcs.length);
  }
  function prevImg() {
    console.log("prev");
    setCurrentImg(
      (currentImg - 1 < 0 ? currentImg - 1 + srcs.length : currentImg - 1) %
        srcs.length
    );
  }
  //---------------------------------------------------

  return (
    <>
      {/* ----------------adding product modal------------------------ */}
      <AddProd
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isAdmin={isAdmin}
      />
      <section className="page">
        <div className="img-cont-car">
          <Carousel
            srcs={srcs}
            currentImg={currentImg}
            setCurrentImg={setCurrentImg}
            isInfinite={true}
            nextTime={5000}
            nextImg={nextImg}
            prevImg={prevImg}
          />
        </div>
        <h1 className="text-hover">Explore by top categories</h1>
        <div className="container">
          <div className="category-card">
            <img
              alt="this"
              draggable="false"
              src="https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj"
            />
            <div>Food</div>
          </div>
          <div className="category-card">
            <img
              alt="this"
              draggable="false"
              src="https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg"
            />
            <div>Beauty</div>
          </div>
          <div className="category-card">
            <img
              alt="this"
              draggable="false"
              src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
            />
            <div>Home</div>
          </div>
          <div className="category-card">
            <img
              alt="this"
              draggable="false"
              src="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651"
            />
            <div>Electronics</div>
          </div>
        </div>
        <h1 className="text-hover">Our products</h1>
        <div className="container">
          {isAdmin ? (
            <div
              className="add card"
              onClick={() => {
                setIsVisible(true);
              }}
            >
              <IoIosAddCircle size={30} />
              <div>Add a product</div>
            </div>
          ) : null}

          {props.products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.images[0]}
              title={product.title}
              category={product.category}
              price={product.price}
            />
          ))}

          {/* TODO: also create components for various part and add various props to these cards */}
        </div>
      </section>
    </>
  );
}

export default App;
