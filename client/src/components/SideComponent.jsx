import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Form } from "react-bootstrap";
import "./SideComponent.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

function SideComponent({
  categories,
  productsFromCategories,
  productsByCategories,
  orderByLowerPrice,
  orderByHighPrice,
}) {
  return (
    <div className="sideComponent">
      <h2 className="d-flex justify-content-center mt-5 categories p-4">
        Categories
      </h2>
      {console.log(productsByCategories)}
      {productsByCategories.length > 0
        ? productsByCategories.map((element) => (
            <Form>
              <div className="d-flex justify-content-between mt-4">
                <Form.Label className="ml-4">{element.name}</Form.Label>
              </div>
            </Form>
          ))
        : categories.map((element) => (
            <Form key={element.id}>
              <div className="d-flex justify-content-between mt-4">
                <Form.Label className="ml-4">{element.name}</Form.Label>
                <button
                  className="mr-4 button-select"
                  onClick={() => productsFromCategories(element.name)}
                >
                  <MdKeyboardArrowRight />
                </button>
              </div>
            </Form>
          ))}
      <div className="mt-5">
        <h5 className="d-flex justify-content-center title-price">
          Order by Price
        </h5>
        <div>
          <div className="d-flex justify-content-center">
            <label className="mr-3 mb-3">Highest</label>
            <button
              className="ml-3 d-flex align-self-center mb-3 highest"
              type="checkbox"
              onClick={orderByHighPrice}
            >
              <AiOutlineArrowUp />
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <label className="mr-3 p-1">Lowest</label>
            <button
              className="ml-3 d-flex align-self-center mb-1 lowest"
              type="checkbox"
              onClick={orderByLowerPrice}
            >
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideComponent

