import React, { useState, useEffect } from "react";
import AddCategoryForm from "./AddCategoryFrom";
import EditCategoryForm from "./EditCategoryForm";
import { Modal, Table, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/category")
      .then((res) => res.data)
      .then((res) => setCategories(res));
  }, []);


  const addCategory = (category) => {
     
    const newCategory = {
      name: category.name,
      description: category.description           //creo la categorias que voy a enviar con los datos de category
    }

    axios.post('http://localhost:4000/category', newCategory)  //se la envio a la db mediante un post
      .then(res => res.data)
      .then(res => {
        console.log('res', res)
      })

      category.id = categories.length + 1;
    setCategories([...categories, category]);        //traemos todo de categorias y añadimos 1
  };

    const deleteCategory = (id) => {
      setCategories(categories.filter((element) => element.id !== id));

      axios
        .delete(`http://localhost:4000/category/${id}`)      //le asigno el id que me pide la ruta para que lo elimine
        .then((res) => res.data)
        .then((res) => {
          console.log("res", res);
        });
    };

  const editRow = (category) => {
    setEditing(true);
    setUpdateShow(true);          //para que se abra el modal

    setCurrentCategory({
      id: category.id,
      name: category.name,                //con esto cuando abrimos el modal nos aparecen los datos que ya estan cargados
      description: category.description,    //el objetivo de esto es que el usuario no tenga que cargar todo de nuevo
    });                                      //sino que pueda borrar y cambiar lo que desee actualizar     
  };

  const updateCategory = (id, updateCategory) => {

    const newCategory = {
      name: updateCategory.name,
      description: updateCategory.description
    }

    axios
        .put(`http://localhost:4000/category/${id}`, newCategory)
        .then((res) => res.data)
        .then((res) => {
          console.log("res", res);
        });


        setEditing(false);

    setCategories(
      categories.map((element) =>
        element.id === id ? updateCategory : element
      )
    );
  };

  return (
    <Row  className="table-categories">
      <Col xs={2}></Col>
      <Col>
      <div className="d-flex justify-content-between mb-4 mt-4">
      <h2 style={{color: 'white'}}>Categories</h2>
        <Button style={{backgroundColor: '#8a2be2'}} className="button-bootstrap mr-2" variant="primary" onClick={handleShowAdd}>
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
                      className="button muted-button button-bootstrap mr-1"
                      style={{backgroundColor: '#8a2be2'}}
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
                      className="button muted-button button-bootstrap ml-1"
                      style={{backgroundColor: '#8a2be2'}}
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
