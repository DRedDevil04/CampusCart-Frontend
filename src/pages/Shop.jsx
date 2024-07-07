import React from "react";
import "../components/styles.css";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";
import PropTypes from "prop-types";
import { IoArrowBackCircle } from "react-icons/io5";

function Shop(props) {
  const {
    onOpen,
    isOpen,
    onClose,
    btnRef,
    isCategory,
    isSearched,
    products,
    categories,
  } = props;
  const userInfo = useSelector(selectUser);
  const email = userInfo?.email;

  const srcs = [
    "https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg",
    "https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651",
    "https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png",
    "https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj",
    "https://cdn.shopify.com/s/files/1/1859/8979/files/image17_3cfc7cfb-8215-40b7-a297-db7285d5375b.png?v=1610384290",
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg",
  ];

  const [currentImg, setCurrentImg] = React.useState(0);

  const nextImg = () => setCurrentImg((currentImg + 1) % srcs.length);
  const prevImg = () =>
    setCurrentImg((currentImg - 1 + srcs.length) % srcs.length);

  return (
    <>
      <Header onOpen={onOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <section className="page">
        {!isCategory && !isSearched && (
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
        )}

        {!isCategory && !isSearched && (
          <h1 className="text-hover">Explore by top categories</h1>
        )}
        <div className="cat-cont container">
          {categories?.map((category) => (
            <CategoryCard
              key={category._id}
              category={category.name}
              url={category.icon}
            />
          ))}
        </div>
        {(isCategory || isSearched) && (
          <div className="back-shop" onClick={() => history.back()}>
            <IoArrowBackCircle /> <div>Back to shop</div>
          </div>
        )}
        <h1 className="text-hover">
          {!isCategory && !isSearched
            ? "Our products"
            : isCategory && !isSearched
            ? products.length > 0
              ? "Explore " +
                products[0].category.name[0].toUpperCase() +
                products[0].category.name.slice(1)
              : "Explore"
            : "Search Results"}
        </h1>
        <div className="container">
          {products.length === 0 ? (
            <h2 className="no-prod">No products found...</h2>
          ) : (
            products.map((product) => (
              <Card
                key={product._id}
                ID={product._id}
                img={
                  product.images.length > 0
                    ? product.images[0].url
                    : "https://placehold.co/400"
                }
                title={product.name}
                category={product.category.name}
                price={product.price.amount}
                email={email}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

Shop.propTypes = {
  btnRef: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isCategory: PropTypes.bool,
  isSearched: PropTypes.bool,
  products: PropTypes.array.isRequired,
  categories: PropTypes.array,
};

export default Shop;