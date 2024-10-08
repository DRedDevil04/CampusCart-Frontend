import React from "react";
import "../components/styles.css";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
// import CategoryCard from "../components/CategoryCard";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";
import PropTypes from "prop-types";

function Shop(props) {
  const {
    onOpen,
    isOpen,
    onClose,
    btnRef,
    // isCategory,
    // isSearched,
    products,
    // categories,
  } = props;
  const userInfo = useSelector(selectUser);
  const email = userInfo?.email;
  // const srcs = [
  //   // "https://i.imgur.com/hDpGIev.jpeg",
  //   "https://www.nykaa.com/beauty-blog/wp-content/uploads/images/issue283/8-Breakthrough-Products-That-Are-Selling-Faster-Than-You-Can-Cou_OI.jpg",
  //   "https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651",
  //   "https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png",
  //   "https://www.nowfoods.com/sites/default/files/styles/masthead_64/public/2023-11/Natrual_Foods_Hero-2_0.jpg?itok=WYhBCrrj",
  // ];

  // const [currentImg, setCurrentImg] = React.useState(0);

  // const nextImg = () => setCurrentImg((currentImg + 1) % srcs.length);
  // const prevImg = () =>
  //   setCurrentImg((currentImg - 1 + srcs.length) % srcs.length);

  return (
    <>
      <Header onOpen={onOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <section className="page">
        {/* <div className="img-cont-car">
          <Carousel
            srcs={srcs}
            currentImg={currentImg}
            setCurrentImg={setCurrentImg}
            isInfinite={true}
            nextTime={5000}
            nextImg={nextImg}
            prevImg={prevImg}
          />
        </div> */}

        {/* {!isCategory && !isSearched && (
          <h1 className="text-hover">Explore by kits</h1>
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
        )} */}
        <h1 className="text-hover">Our products</h1>
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
                discount={product.price.discount.percentage}
                available={product.available}
                email={email}
              />
            ))
          )}
        </div>
      </section>
      <footer className="footer">Contact us: +917068618014</footer>
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
