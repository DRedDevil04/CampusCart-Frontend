import React from "react";
import "../components/styles.css";
import Card from "../components/Card";
import { IoIosAddCircle } from "react-icons/io";
import AddProd from "../components/AddProd";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";

function App(props) {
  var isAdmin = true; // TODO: adding props.isAdmin
  var [isVisible, setIsVisible] = React.useState(false);

  const propData = props;

  //----------------- carousel -------------------------
  const srcs = [
    "https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg",
    "https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651",
    "https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png",
    "https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj",
    "https://cdn.shopify.com/s/files/1/1859/8979/files/image17_3cfc7cfb-8215-40b7-a297-db7285d5375b.png?v=1610384290",
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  ];

  const [currentImg, setCurrentImg] = React.useState(0);
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
        {propData.isCategory === false && propData.isSearched === false ? (
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
        ) : null}
        {propData.isCategory === false && propData.isSearched === false ? (
          <h1 className="text-hover">Explore by top categories</h1>
        ) : null}
        {propData.isCategory === false && propData.isSearched === false ? (
          <div className="cat-cont container">
            <CategoryCard
              category="Food"
              url="https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj"
            />

            <CategoryCard
              category="beauty"
              url="https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg"
            />
            <CategoryCard
              category="Electronics"
              url="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651"
            />
            <CategoryCard
              category="Home"
              url="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"
            />
          </div>
        ) : null}
        <h1 className="text-hover">
          {propData.isCategory === false && propData.isSearched === false
            ? "Our products"
            : propData.isCategory === true && propData.isSearched === false
            ? propData.products.length > 0
              ? "Explore " +
                (propData.products[0].category[0].toUpperCase() +
                  propData.products[0].category.slice(1))
              : "Explore"
            : "Search Results"}
        </h1>
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

          {propData.products.length === 0 ? (
            <h2 className="no-prod">No products found...</h2>
          ) : (
            propData.products.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                img={product.images[0]}
                title={product.title}
                category={product.category}
                price={product.price}
              />
            ))
          )}

          {/* TODO: also create components for various part and add various props to these cards */}
        </div>
      </section>
    </>
  );
}

export default App;
