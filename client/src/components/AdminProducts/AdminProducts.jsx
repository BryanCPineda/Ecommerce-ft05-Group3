import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import swal from 'sweetalert'
import Create from "./Create";
import List from "./List";
import './crudProduct.css';

//-------------- Redux ------------------------
import { connect } from 'react-redux';
import { getProducts, createProduct } from '../../actions/product';


function AdminProducts({products, getProducts, createProduct}) {

  const initialFormState = [
    {
      id: null,
      name: "",
      description: "",
      price: null,
      stock: null,
      images: "",
      categories: "",
    },
  ];

  const [state, setState] = useState({
    creating: false,
    products: products,
    totalProducts: 0,
  });



  const handleCreating = () => {
    setState({
      ...state,
      creating: !state.creating,
    });

  };

  const handleCreate = () => {

    handleCreating();
    return (attributes) => {
      createProduct(attributes).then(() => {
        swal("Product Created!", "", "success")
        .then(() => getProducts())
        
      });
    };
  };
  

  useEffect(() => {
    getProducts();

  }, [getProducts]);

  useEffect(() => {
        setState({
            ...state,
            products: products,
          });
      }, [products]);

  return (
    <Container fluid className="table-categories">
      <Create
        show={state.creating}
        createProduct={handleCreate}
        handleClose={handleCreating}
      />
      <Row>
        <Col>
          <div className="d-flex p-2 justify-content-between aling-items-center">
            <h1 style={{color: 'white'}}>Products</h1>
            <span>
              <Button
                onClick={handleCreating}
                style={{
                  backgroundColor: "#A855DE",
                  color: "#ffffff",
                  border: "#8a2be2",
                  padding: "5px 10px 5px 10px",
                }}
                className="m-1"
              >
                <FiPlus /> Add new Product
              </Button>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {state.products.length > 0 && <List products={state.products} />}
          {console.log('state.products', state.products)}
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
        return {
                products: state.productReducer.products,
        }
}


function mapDispatchToProps(dispatch) {
        return {
                getProducts: () => dispatch(getProducts()),
                createProduct: (prod) => dispatch(createProduct(prod)),
        }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(AdminProducts);