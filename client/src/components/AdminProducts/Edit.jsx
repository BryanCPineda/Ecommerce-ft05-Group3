import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col
} from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import './crudProduct.css';

//-------------- Redux ------------------------
import { connect } from 'react-redux';
import { addCategoryToProduct, deleteCategoryToProduct } from '../../actions/product';

function Edit({ allCategories, updateProduct, show, product, handleClose, addCategoryToProduct, deleteCategoryToProduct }) {
  const { id, images, name, description, stock, price, categories } = product;
  const [state, setState] = useState({
    images: images ? images.map((item) => item.id) : [],
    id,
    name,
    description,
    stock,
    price,
    categories: categories ? categories.map((item) => item.id) : [],
    categoriesToDelete: [],
  });

  useEffect(() => {
    setState({
      images: images ? images.map((item) => item.id) : [],
      id,
      name,
      description,
      stock,
      price,
      categories: categories ? categories.map((item) => item.id) : [],
      categoriesToDelete: [],
    });
  }, [
    product,
    product.categories,
    id,
    categories,
    name,
    description,
    price,
    stock,
    images,
  ]);

  const [errors, setErrors] = useState({ nameError: "", descriptionError: "" })

  //validate errors
  const validate = () => {
    let nameError = "";
    let descriptionError = "";
    let priceError = "";
    let stockError = "";
    let categoriesError = "";
    let imagesError = "";

    if (state.name.length < 5 || state.name.length > 40) {
      nameError = "Name must have at least 5 characters and max 40"
    }
    if (state.description.length < 20 || state.description.length > 255) {
      descriptionError = "Description must have at least 20 characters and max 255"
    }
    if (state.price > 100000000 || state.price <= 0 || typeof state.price === 'number') {
      priceError = "Invalid price";
    }
    if (state.stock <= 0 || state.stock > 100000000) {
      stockError = "Invalid content";
    }
    if (!state.categories) {
      categoriesError = "Invalid content";
    }
    if (!state.images) {
      imagesError = "Cannot be empty";
    }

    if (nameError || descriptionError || priceError || stockError || categoriesError || imagesError) {
      setErrors({ nameError, descriptionError, priceError, stockError, categoriesError, imagesError });
      return false;
    }
    return true;
  }

  const handleOnUpdate = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      updateProduct()(id, state);
    }
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSelect = (selectedItem) => {
    addCategoryToProduct(selectedItem.id, product.id);
  };

  const onRemove = (removedItem) => {
    deleteCategoryToProduct(removedItem.id, product.id);
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header style={{ backgroundColor: '#8a2be2' }} className="border-0 bg-dark2" closeButton>
        <Modal.Title style={{ color: 'white' }}>Edit Product</Modal.Title>
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
            <Form.Label>Categories</Form.Label>
          </Form.Group>
          <Form.Group>
            <Multiselect
              options={allCategories}
              displayValue="name"
              placeholder="Categorias"
              closeOnSelect={false}
              onSelect={onSelect}
              onRemove={onRemove}
              selectedValues={categories}
            >
              {" "}
            </Multiselect>
            {errors.categoriesError && (
              <div className="mt-2" style={{ color: "red", fontSize: 14 }}>
                {errors.categoriesError}
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleInput}
              value={state.description}
              name="description"
              rows="5"
              placeholder="Descripción"
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
        <Button className="button-create" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="button-create" onClick={handleOnUpdate}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    products: state.productReducer.products,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addCategoryToProduct: (cat, id) => dispatch(addCategoryToProduct(cat, id)),
    deleteCategoryToProduct: (cat, id) => dispatch(deleteCategoryToProduct(cat, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);