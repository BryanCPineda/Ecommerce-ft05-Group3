import React, { useState } from 'react'
import {Form, Col, Button, Card} from 'react-bootstrap'
import AddImages from './AddImages'

const AddProduct = (props) => {
  const initialFormState = { id: null, name: '', description: '' , price: null, stock: null, img: ''}
  const [prod, setProd] = useState(initialFormState)
  const [imagen, setImagen] =useState([]);

<<<<<<< HEAD
=======
  const agregarProductosDB = (prod) => {
    const prodEnviar = {
        name: prod.name,
        description: prod.description,
        price: 100,
        stock: 10
    }
            
            Axios.post('http://localhost:4000/products', prodEnviar)
            .then(res => res.data)
            .then(res => {
                console.log('res', res)
            })
  }

>>>>>>> 45d553a... se agrega axios
  const handleInputChange = (event) => {
    const { name, value } = event.target
    console.log('aaa', value)
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
                <br />
                <Form.Row>
                    <Form.Label column="sm" lg={2}>
                        Imagen
                    </Form.Label>
                    <Col>
                    <Card>
                        <Card.Body>
                            <AddImages img={setImagen}/>
                        </Card.Body>
                        <Form.Control type="text"
                        name="img"
                        value={imagen}
                        onChange={handleInputChange} />
                    </Card>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Button
                        // onClick={() => props.setEditing(false)}
                        // className="button muted-button"
                        onClick={() => {
                            if (!prod.name || !prod.description) return

                            props.addProduct(prod)
                            props.onHide(false)
                            // setProd(initialFormState)
                            setProd({ ...prod, img: imagen })
                            console.log(imagen)
                            console.log('I',prod)
                            let prod2 = prod
                            prod2.img = imagen
                            console.log('II',prod2)
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