import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FiMaximize2, FiTrash2, FiPlus } from 'react-icons/fi';


function Create({ show, handleClose, createProduct }) {
        const [state, setState] = useState({
                images: '',
                name: '',
                description: '',
                stock: '',
                price: ''
        });

        const handleInput = (e) => {
                setState({
                        ...state,
                        [e.target.name]: e.target.value
                })
        }

        return (
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header className="border-0 bg-dark2" closeButton>
                                <Modal.Title>Añadir producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark2">
                                <form>
                                        <Form.Group>
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control onChange={handleInput} value={state.name} name="name" placeholder="Nombre" />
                                        </Form.Group>
                                        <Row>
                                                <Col>
                                                        <Form.Group>
                                                                <Form.Label>Precio</Form.Label>
                                                                <Form.Control onChange={handleInput} value={state.price * 1} type="number" name="price" step="any" placeholder="Precio" />
                                                        </Form.Group>
                                                </Col>
                                                <Col>
                                                        <Form.Group>
                                                                <Form.Label>Stock</Form.Label>
                                                                <Form.Control onChange={handleInput} value={state.stock * 1} type="number" name="stock" placeholder="Stock" />
                                                        </Form.Group>
                                                </Col>
                                        </Row>
                                        <Form.Group>
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control as="textarea" onChange={handleInput} value={state.description} name="description" rows="5" placeholder="Nombre" />
                                        </Form.Group>
                                </form>
                        </Modal.Body>
                        <Modal.Footer className="border-0 bg-dark2">
                                <Button variant="secondary" onClick={handleClose}>
                                        Cancelar
              </Button>
                                <Button variant="primary" onClick={() => createProduct()(state)}>
                                        Añadir
              </Button>
                        </Modal.Footer>
                </Modal >
        );
}

export default Create;