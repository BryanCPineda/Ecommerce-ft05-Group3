import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EditCategoryForm = ({ setEditing, currentCategory, updateCategory }) => {
  const initialFormState = { id: null, name: "", description: "" };

  const [category, setCategory] = useState(currentCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    if (!category.name || !category.description) return;
    updateCategory(category.id, category);
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
          <Button
            style={{ backgroundColor: "#7F00FF" }}
            className="button-bootstrap"
            onClick={() => setEditing(false)}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#7F00FF" }}
            className="button-bootstrap ml-2"
            variant="primary"
            onClick={onSubmitUpdate}
          >
            Update
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default EditCategoryForm;
