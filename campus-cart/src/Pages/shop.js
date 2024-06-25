import React, { useState, useRef } from "react";
import "../Components/styles.css";
import Card from "../Components/Card";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import AddProd from "../Components/AddProd";

function App(props) {
  var isAdmin = true; // TODO: adding props.isAdmin
  var [isVisible, setIsVisible] = useState(false);
  return (
    <>
      {/* ----------------adding product modal------------------------ */}
      <AddProd
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isAdmin={isAdmin}
      />
      <section className="page">
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
