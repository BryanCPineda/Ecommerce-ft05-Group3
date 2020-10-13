import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FiMaximize2, FiTrash2, FiPlus } from "react-icons/fi";
import './crudProduct.css';

function Create({ show, handleClose, createProduct }) {
  const [state, setState] = useState({
    images: "",
    name: "",
    description: "",
    stock: '',
    price: '',
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
        // let imagesError = "";
    
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
        // if (!state.images) {
        //   imagesError = "Cannot be empty";
        // }

        if(nameError || descriptionError || priceError || stockError){
          setErrors({ nameError, descriptionError, priceError, stockError});
          return false;
        }
        return true;
      }

  const handleSumbitCreate = () => {
    const isValid = validate();
    if (isValid) {
      const productoCreado = state
      setState({
        images: "",
        name: "",
        description: "",
        stock: '',
        price: '',
      })
      createProduct()(productoCreado);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{backgroundColor: '#8a2be2'}} className="border-0 bg-dark2" closeButton>
        <Modal.Title style={{color: 'white'}}>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark2">
        <form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
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
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={state.price}
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
                  value={state.stock}
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
            <Form.Label>Description</Form.Label>
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
        <Button className="button-create" onClick={() =>{
                handleClose();
                setState( {images: "",
                name: "",
                description: "",
                stock: '',
                price: ''})
        }}>
          Cancel
        </Button>
        <Button className="button-create" onClick={handleSumbitCreate}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Create;
