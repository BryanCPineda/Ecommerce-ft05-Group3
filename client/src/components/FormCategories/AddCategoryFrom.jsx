import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddUserForm = ({ addCategory, handleCloseAdd }) => {
  const initialFormState = { id: null, name: "", description: "" };

  const [category, setCategory] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const onSubmitAdd = (e) => {
    e.preventDefault();
    if (!category.name || !category.description) return;
    addCategory(category);
    setCategory(initialFormState);
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={category.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={category.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleCloseAdd} style={{backgroundColor: '#7F00FF'}} className="button-bootstrap">
          Close
        </Button>
        <Button variant="primary" onClick={onSubmitAdd} style={{backgroundColor: '#7F00FF'}} className="button-bootstrap ml-2">
          Create
        </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default AddUserForm;
