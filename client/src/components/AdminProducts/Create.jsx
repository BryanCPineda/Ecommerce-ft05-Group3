import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FiMaximize2, FiTrash2, FiPlus } from "react-icons/fi";

function Create({ show, handleClose, createProduct }) {
  const [state, setState] = useState({
    images: "",
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  const [errors, setErrors] = useState({
        nameError: "",
        descriptionError: "",
        priceError: "",
        stockError: "",
        categoriesError: "",
        imagesError: "",
      });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //validaciones
  const validate = () => {
        let nameError = "";
        let descriptionError = "";
        let priceError = "";
        let stockError = "";
        let categoriesError = "";
        let imagesError = "";
    
        if(state.name.length < 5 || state.name.length > 40) {
          nameError = "Name must have at least 5 characters and max 40"
        }
        if(state.description.length < 20 || state.description.length > 255) {
          descriptionError = "Description must have at least 20 characters and max 255"
        }
        if (state.price > 100000000 || state.price <= 0 || typeof state.price === 'number') {
          priceError = "Invalid price";
        }
        if (state.stock <= 0 || state.stock > 100000000) {
          stockError = "Invalid content";
        }
        if (!state.images) {
          imagesError = "Cannot be empty";
        }

        if(nameError || descriptionError || priceError || stockError || imagesError){
          setErrors({ nameError, descriptionError, priceError, stockError, imagesError });
          return false;
        }
        return true;
      }

  const handleSumbitCreate = () => {
    // const isValid = validate();
    // if (isValid) {
      createProduct()(state);
      setState({
        images: "",
        name: "",
        description: "",
        stock: "",
        price: "",
      });
    // }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="border-0 bg-dark2" closeButton>
        <Modal.Title>Añadir producto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark2">
        <form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={handleInput}
              value={state.name}
              name="name"
              placeholder="Nombre"
            />
            {errors.nameError && (
              <div className="mt-2" style={{ color: "red", fontSize: 14 }}>
                {errors.nameError}
              </div>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={state.price * 1}
                  type="number"
                  name="price"
                  step="any"
                  placeholder="Precio"
                />
                {errors.priceError && (
                  <div className="mt-2" style={{ color: "red", fontSize: 14 }}>
                    {errors.priceError}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={state.stock * 1}
                  type="number"
                  name="stock"
                  placeholder="Stock"
                />
                {errors.stockError && (
                  <div className="mt-2" style={{ color: "red", fontSize: 14 }}>
                    {errors.stockError}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleInput}
              value={state.description}
              name="description"
              rows="5"
              placeholder="Nombre"
            />
            {errors.descriptionError && (
              <div className="mt-2" style={{ color: "red", fontSize: 14 }}>
                {errors.descriptionError}
              </div>
            )}
          </Form.Group>
        </form>
      </Modal.Body>
      <Modal.Footer className="border-0 bg-dark2">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSumbitCreate}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Create;
