import React, { useState } from "react";
import AddCategoryForm from "./AddCategoryFrom";
import EditCategoryForm from "./EditCategoryForm";
import { Modal, Table, Row, Col, Button } from "react-bootstrap";
import './FormCategories.css'

function FormCategories() {
  const CategoriesData = [
    {
      id: 1,
      name: "Fuerza",
      description: "Articulos relacionados a entrenamiento de fuerza",
    },
    {
      id: 2,
      name: "Cardio",
      description: "Articulos relacionados a entrenamiento de cardio",
    },
    {
      id: 3,
      name: "Suplementos",
      description: "Suplementos dieteticos para potenciar el entrenamiento",
    },
  ];

  const initialFormState = { id: null, name: "", description: "" };

  const [categories, setCategories] = useState(CategoriesData);
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

  const addCategory = (category) => {
    category.id = categories.length + 1;
    setCategories([...categories, category]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((element) => element.id !== id));
  };

  const editRow = (category) => {
    setEditing(true);
    setUpdateShow(true);

    setCurrentCategory({
      id: category.id,
      name: category.name,
      description: category.username,
    });
  };

  const updateCategory = (id, updateCategory) => {
    setEditing(false);

    setCategories(
      categories.map((element) =>
        element.id === id ? updateCategory : element
      )
    );
  };

  return (
    <Row style={{backgroundColor: '#FAFAFA'}}>
      <Col xs={2}></Col>
      <Col>
      <div className="d-flex justify-content-between mb-4 mt-4">
      <h2>Categories</h2>
        <Button style={{backgroundColor: '#7F00FF'}} className="button-bootstrap mr-2" variant="primary" onClick={handleShowAdd}>
          Add Category
        </Button>
      </div>
      
        <Modal show={addShow} onHide={handleCloseAdd} className="modal">
          <Modal.Header style={{backgroundColor: '#7F00FF'}} closeButton>
            <Modal.Title style={{color: 'white'}} >New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCategoryForm
              addCategory={addCategory}
              handleCloseAdd={handleCloseAdd}
            />
          </Modal.Body>
        </Modal>
        <div >
        <Table  bordered hover style={{backgroundColor: 'white'}} className="table-container" >
          <thead>
            <tr >
              <th>id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.description}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                    <Button
                      onClick={() => editRow(element)}
                      className="button muted-button button-bootstrap"
                      style={{backgroundColor: '#7F00FF'}}
                    >
                      Edit
                    </Button>
                    {editing && (
                      <Modal show={updateShow} onHide={handleCloseUpdate}>
                        <Modal.Header closeButton style={{backgroundColor: '#7F00FF'}}>
                          <Modal.Title style={{color: 'white'}}>Update Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <EditCategoryForm
                            setEditing={setEditing}
                            currentCategory={currentCategory}
                            updateCategory={updateCategory}
                          />
                        </Modal.Body>
                      </Modal>
                    )}
                    <Button
                      onClick={() => deleteCategory(element.id)}
                      className="button muted-button button-bootstrap"
                      style={{backgroundColor: '#7F00FF'}}
                    >
                      Delete
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
      </Col>
      <Col xs={2}></Col>
    </Row>
  );
}

export default FormCategories;
