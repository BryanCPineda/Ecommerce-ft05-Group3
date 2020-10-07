import React, { useState } from 'react'
import {Form, Col, Button} from 'react-bootstrap'

const AddProduct = (props) => {
  const initialFormState = { id: null, name: '', description: '' , price: null, stock: null}
  const [prod, setProd] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setProd({ ...prod, [name]: value })
  }

  return (
            <Form.Group>
                <Form.Row>
                <Form.Label column="sm" lg={2}>
                    Nombre
                </Form.Label>
                <Col>
                    <Form.Control type="text"
                    name="name"
                    value={prod.name}
                    onChange={handleInputChange} />
                </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        Descripcion
                    </Form.Label>
                    <Col>
                    <Form.Control type="text"
                        name="description"
                        value={prod.description}
                        onChange={handleInputChange} />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        Precio
                    </Form.Label>
                    <Col>
                    <Form.Control type="text"
                        name="price"
                        value={prod.price}
                        onChange={handleInputChange} />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        Stock
                    </Form.Label>
                    <Col>
                    <Form.Control type="text"
                        name="stock"
                        value={prod.stock}
                        onChange={handleInputChange} />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Button
                        // onClick={() => props.setEditing(false)}
                        // className="button muted-button"
                        onClick={() => {
                            if (!prod.name || !prod.description) return

                            props.addProduct(prod)
                            props.onHide(false)
                            setProd(initialFormState)
                        }}
                    >Agregar Producto</Button>
                </Form.Row>
            </Form.Group>
            // <form
            //     onSubmit={(event) => {
            //         event.preventDefault()
            //         if (!prod.name || !prod.description) return

            //         props.addProduct(prod)
            //         setProd(initialFormState)
            //     }}
            // >
            // <label>Nombre</label>
            // <input
            //     type="text"
            //     name="name"
            //     value={prod.name}
            //     onChange={handleInputChange}
            // />
            // <label>Descripción</label>
            // <input
            //     type="text"
            //     name="description"
            //     value={prod.description}
            //     onChange={handleInputChange}
            // />
            // <label>Precio</label>
            // <input
            //     type="text"
            //     name="price"
            //     value={prod.price}
            //     onChange={handleInputChange}
            // />
            // <label>Stock</label>
            // <input
            //     type="text"
            //     name="stock"
            //     value={prod.stock}
            //     onChange={handleInputChange}
            // />
            // <button>Agregar Producto</button>
            // </form>
  )
}

export default AddProduct