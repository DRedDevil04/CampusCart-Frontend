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
          <Route path="/product" element={<Product/> } />
        </Routes>
    </Router>
    // <div>
    //   <Shop products={data} />
    //   <Product/>
    // </div>
  );
}

export default App;
