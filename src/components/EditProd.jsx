import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

function EditProd(props) {
  return (
    <>
      {props.isEditModVisible && props.isAdmin ? (
        <div
          className="edit-prod add-prod modal"
          id="modal"
          style={{ overflow: "auto" }}
        >
          <div
            className="cont-mod"
            style={{ paddingTop: "60px", paddingBottom: "0px" }}
          >
            <form className="add-product-form">
              <div
                className="close"
                onClick={() => {
                  props.setIsEditModVisible(false);
                }}
              >
                <IoIosCloseCircle />
              </div>
              <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter the product name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter its price"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="discount">Discount Amount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  placeholder="Enter its discount amount"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select type="number" id="category" name="category" required>
                  <option value="0" disabled>
                    (Select a category)
                  </option>
                  <option value="1">Category 1</option>
                  <option value="1">Category 2</option>
                  <option value="1">Category 3</option>
                  <option value="1">Category 4</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter the description of the product"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Enter the URL of the images (seperate them with a , )"
                  required
                />
              </div>
              <button type="submit">Edit Product</button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditProd;
