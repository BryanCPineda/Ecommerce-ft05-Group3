import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddUserForm = ({ addCategory, handleCloseAdd }) => {
  const initialFormState = { id: null, name: "", description: "" };

  const [category, setCategory] = useState(initialFormState);

  const [errors, setErrors] = useState({ nameError: "", descriptionError: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const validate = () => {
    let nameError = "";
    let descriptionError = "";

    if(category.name.length < 3 || category.name.length > 30) {
      nameError = "Name must have at least 3 characters and max 30"
    }
    if(category.description.length < 10 || category.description.length > 80) {
      descriptionError = "Description must have at least 10 characters and max 80"
    }
    if(nameError || descriptionError) {
      setErrors({ nameError, descriptionError });
      return false;
    }
    return true;
  }

  const onSubmitAdd = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      addCategory(category);
      setCategory(initialFormState);
    }
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
          {errors.nameError && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{errors.nameError}</div>}
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
          {errors.descriptionError && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{errors.descriptionError}</div>}
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
