import React, { useState, useEffect } from "react";
import AddCategoryForm from "./AddCategoryFrom";
import EditCategoryForm from "./EditCategoryForm";
import { Modal, Table, Row, Col, Button, Container } from "react-bootstrap";
import axios from 'axios';
import './FormCategories.css'
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';
import { connect } from 'react-redux';
import Pagination from '../Pagination';

//-------------------Redux-----------------//
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../actions/crudCategoriesActions";

function FormCategories({
  getAllCategories,
  allCategories,
  createCategory,
  deleteCategory,
  updateCategory,
}) {
  const initialFormState = { id: null, name: "", description: "" };

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  //----------------Modal------------------//
  const [addShow, setAddshow] = useState(false);
  const handleCloseAdd = () => setAddshow(false);
  const handleShowAdd = () => setAddshow(true);

  const [updateShow, setUpdateShow] = useState(false);
  const handleCloseUpdate = () => setUpdateShow(false);
  const handleShowUpdate = () => setUpdateShow(true);
  //----------------Modal------------------//

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(5);

  useEffect(() => getAllCategories(), []);

  useEffect(() => {
    if (allCategories) {
      setCategories(allCategories);
    }
  });

  const addCategory = (category) => {
    const newCategory = {
      name: category.name,
      description: category.description, //creo la categorias que voy a enviar con los datos de category
    };
    createCategory(newCategory);
  };

  const editRow = (category) => {
    setEditing(true);
    setUpdateShow(true); //para que se abra el modal

    setCurrentCategory({
      id: category.id,
      name: category.name, //con esto cuando abrimos el modal nos aparecen los datos que ya estan cargados
      description: category.description, //el objetivo de esto es que el usuario no tenga que cargar todo de nuevo
    }); //sino que pueda borrar y cambiar lo que desee actualizar
  };

  const editCategory = (id, editCategory) => {
    console.log("jello");
    const newCategory = {
      name: editCategory.name,
      description: editCategory.description,
    };
    updateCategory(id, newCategory);
    setEditing(false);
    setCategories(
      categories.map((element) => (element.id === id ? newCategory : element))
    );
  };

  const indexOfLastProduct = currentPage * elementsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - elementsPerPage;
  const currentProducts = allCategories.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <Container className="table-categories mt-4">
      <div>
        <div className="d-flex justify-content-between mb-4 mt-4">
          <h2 style={{ color: "white" }}>Categories</h2>
          <Button
            style={{ backgroundColor: "#8a2be2" }}
            className="button-bootstrap mr-2"
            variant="primary"
            onClick={handleShowAdd}
          >
            Add Category
          </Button>
        </div>

        <Modal show={addShow} onHide={handleCloseAdd} className="modal">
          <Modal.Header style={{ backgroundColor: "#7F00FF" }} closeButton>
            <Modal.Title style={{ color: "white" }}>New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCategoryForm
              addCategory={addCategory}
              handleCloseAdd={handleCloseAdd}
            />
          </Modal.Body>
        </Modal>
        <div>
          <Table
            bordered
            hover
            style={{ backgroundColor: "white" }}
            className="table-container"
          >
            <thead>
              <tr>
                <th className="text-center">id</th>
                <th className="text-center">Name</th>
                <th className="text-center">Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((element) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.description}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <Button
                          onClick={() => editRow(element)}
                          className="button-bootstrap mr-1"
                          style={{ backgroundColor: "#8a2be2" }}
                        >
                          <FiEdit3 />
                        </Button>
                        {editing && (
                          <Modal show={updateShow} onHide={handleCloseUpdate}>
                            <Modal.Header
                              closeButton
                              style={{ backgroundColor: "#7F00FF" }}
                            >
                              <Modal.Title style={{ color: "white" }}>
                                Update Category
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <EditCategoryForm
                                setEditing={setEditing}
                                currentCategory={currentCategory}
                                editCategory={editCategory}
                              />
                            </Modal.Body>
                          </Modal>
                        )}
                        <Button
                          onClick={() => deleteCategory(element.id)}
                          className="button-bootstrap ml-1"
                          style={{ backgroundColor: "#8a2be2" }}
                        >
                          <FiTrash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No Categories</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Pagination elementsPerPage={elementsPerPage} totalElements={allCategories.length} paginate={paginate}/>
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    allCategories: state.crudCategories.allCategories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    createCategory: (newCategory) => dispatch(createCategory(newCategory)),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    updateCategory: (id, newCategory) => dispatch(updateCategory(id, newCategory))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(FormCategories);
