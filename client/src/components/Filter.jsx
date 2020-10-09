import React from "react";
import { Form } from "react-bootstrap";

function Filter({ order, categories, filterProducts, orderProducts }) {
  return (
    <div className="d-flex justify-content-center mb-2 mt-4">
      <Form className="mr-5">
        <Form.Group controlId="exampleForm.ControlSelect1" className="d-flex">
          <Form.Label className="align-self-center">Order by Price</Form.Label>
          <Form.Control as="select" className="ml-2" value={order} onChange={orderProducts}>
          <option>-</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form className="ml-5">
        <Form.Group controlId="exampleForm.ControlSelect1" className="d-flex">
          <Form.Label className="mr-2 align-self-center">Filter by categories</Form.Label>
          <Form.Control as="select" value={categories} onChange={filterProducts}>
            <option >-</option>
            <option value="Force">Force</option>
            <option value="Resistance">Resistance</option>
            <option value="workout">workout</option>
            <option value="prueba">prueba</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Filter;
