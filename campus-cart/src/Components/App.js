import React from "react";
import Shop from "../Pages/shop";
import Product from "../Pages/product";
import data from "../products";

function App(props) {
  return (
    <div>
      <Shop products={data} />
    </div>
  );
}

export default App;
