import React from "react";
import Shop from "../Pages/shop";
import Product from "../Pages/product";
import data, { categories } from "../products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Shop products={data} isCategory={false} isSearched={false} />
          }
        />
        {/* {data.map((product) => (
          <Route
            key={product.id}
            path={"/product/" + product.id}
            element={<Product product={product} />}
          />
        ))} */}
        <Route
          path="/product/:id"
          element={
            <Shop products={data} isCategory={false} isSearched={false} />
          }
        />
        {categories.map((category) => (
          <Route
            key={category}
            path={"/category/" + category}
            element={
              <Shop
                products={data.filter(
                  (product) => product.category === category
                )}
                isCategory={true}
                isSearched={false}
              />
            }
          />
        ))}
      </Routes>
    </Router>
    // <div>
    //   <Shop products={data} />
    //   <Product/>
    // </div>
  );
}

export default App;
