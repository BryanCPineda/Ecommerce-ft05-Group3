import React, { useState } from 'react'
import {Form, Col, Button} from 'react-bootstrap'

const EditProduct = (props) => {
  const [prod, setProd] = useState(props.currentProduct)

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
                {/* <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        Stock
                    </Form.Label>
                    <Col>
                    <Form.Control type="text"
                        name="img"
                        value={prod.img}
                        onChange={handleInputChange} />
                    </Col>
                </Form.Row>
                <br /> */}
                <Form.Row className="d-flex justify-content-end">
                    <Button
                        // onClick={() => props.setEditing(false)}
                        className="button muted-button"
                        onClick={(event) => {
                            event.preventDefault()
                            props.updateProd(prod.id, prod)
                        }}
                    >Editar</Button>
                    <Button 
                        onClick={() => props.setEditing(false)}
                        className="button muted-button ml-2"
                    >
                        Cancel
                    </Button>
                </Form.Row>
            </Form.Group>
    // <form
    //   onSubmit={(event) => {
    //     event.preventDefault()

    //     props.updateProd(prod.id, prod)
    //   }}
    // >
    //   <label>Nombre</label>
    //   <input
    //     type="text"
    //     name="name"
    //     value={prod.name}
    //     onChange={handleInputChange}
    //   />
    //   <label>Descripcion</label>
    //   <input
    //     type="text"
    //     name="description"
    //     value={prod.description}
    //     onChange={handleInputChange}
    //   />
    //   <label>Precio</label>
    //   <input
    //     type="text"
    //     name="price"
    //     value={prod.price}
    //     onChange={handleInputChange}
    //   />
    //   <label>Stock</label>
    //   <input
    //     type="text"
    //     name="stock"
    //     value={prod.stock}
    //     onChange={handleInputChange}
    //   />
    //   <button>Editar Producto</button>
    //   <button
    //     onClick={() => props.setEditing(false)}
    //     className="button muted-button"
    //   >
    //     Cancel
    //   </button>
    // </form>
  )
}

export default EditProduct