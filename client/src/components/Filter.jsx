import React from "react";
import { Form } from "react-bootstrap";

function Filter({ categories, productsFromCategories }) {
  return (
    <div className="d-flex justify-content-center mb-2 mt-4">
      <Form className="ml-5">
        <Form.Group controlId="exampleForm.ControlSelect1" className="d-flex">
          <Form.Label className="mr-2 align-self-center">Filter by categories</Form.Label>
          <Form.Control as="select" value={categories} onChange={productsFromCategories}>
            <option >-</option>
            {categories && categories.map((ele, index) => (
              <option key={index} value={ele.name}>{ele.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Filter;
