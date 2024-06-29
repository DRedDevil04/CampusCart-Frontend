import React from "react";
import Shop from "../Pages/shop";
import Product from "../Pages/product";
import data from "../products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shop products={data} />} />
        {data.map((product) => (
          <Route
            key={product.id}
            path={"/product/" + product.id}
            element={<Product product={product} />}
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
