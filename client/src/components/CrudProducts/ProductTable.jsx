import React from 'react'
import {Row, Col, Container, Table, Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
const ProductTable = (props) => (
  <Container fluid>
  <Table responsive="sm" striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Imagenes</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {props.prods.length > 0 ? (
        props.prods.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.name}</td>
            <td>{prod.description}</td>
            <td>{prod.price}</td>
            <td>{prod.stock}</td>
            <td><img src={prod.img} height='50px'/></td>
            <td>
                <Button variant='primary' size="sm"
                    onClick={() => {
                        props.editRow(prod)
                    }}
                    className="button muted-button"
                    >
                    Editar
                    </Button>
                <Button variant='danger' size="sm"
                    onClick={() => props.deleteUser(prod.id)}
                    className="button muted-button"
                    >
                    Borrar
                </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>No prods</td>
        </tr>
      )}
    </tbody>
  </Table>
  </Container>

  
)




export default ProductTable