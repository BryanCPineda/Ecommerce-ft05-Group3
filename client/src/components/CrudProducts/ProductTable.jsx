import React, {useEffect, useState} from 'react'
import {Row, Col, Container, Table, Button, Card, Modal} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import AddImages from './AddImages'
import Axios from 'axios'
import './ProductCrud.css'

const ProductTable = (props) => { 
  console.log(props.prods)
  const [imagen, setImagen] = useState([])
  const [idProd, setIdProd] = useState('')
  const [imageUp, setImageUp] = useState(false)
  //----- ventanas modales----------------------------------
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setImageUp(true)
    console.log('setImageUp')
  }
  const handleShow = () => setShow(true);
  //----- ventanas modales----------------------------------

  //--------actualizar imagen ------------------------------
  const [product, setProd] = useState(props.prods)
  
  let propss = props.prods
  console.log('--------------------',propss)
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target
  //   console.log('val', name, value)
  //   setProd({ ...prod, [name]: value })
  // }

  //-------------------------------------

  async function agregarImagenDB(){
    const imgEnviar = {
        productId: idProd,
        image: imagen
    }
    console.log('img',imgEnviar)
            const res = await Axios.post('http://localhost:4000/image', imgEnviar) 

        return (  console.log('image',res ))
    
  } 

  useEffect(() => {
    if (imageUp){
    agregarImagenDB();
    setImageUp(false)
    window.location.reload()
  }
  },[imageUp]);
  
  return (
  <Container fluid>
  <Table responsive="sm" striped bordered hover variant="light" className="table-container">
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
            <td>{prod.images && prod.images.map(e =>  (<img src={e.image} height='50px'/>))} </td>
            <td className="d-flex holaa flex-wrap">
              <div className="d-flex mb-2 mr-2">
                <Button size="sm"
                    onClick={() => {
                        props.editRow(prod)
                    }}
                    className="button muted-button mr-1 nohover button-bootstrap"
                    >
                    Editar
                    </Button>
                <Button size="sm"
                    onClick={() => props.deleteUser(prod.id)}
                    className="button muted-button ml-1 nohover button-bootstrap"
                    >
                    Borrar
                </Button>
                </div>
                <div className="">
                <Button size="sm"
                    onClick={() => {
                      setShow(true)
                      setIdProd(prod.id)
                      props.addImages(prod)
                    // funcion para guardar las imagenes
                    // agregarImagenDB(prod.id)
                    }}
                    style={{backgroundColor: '#8a2be2'}}
                    className="muted-button nohover add-images block button-bootstrap"
                    >
                    Agregar/Editar Imagenes
                </Button>
                </div>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Carga de Imagenes</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <Card>
                              <Card.Body>
                                  <AddImages img={setImagen}/>
                              </Card.Body>
                          </Card>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
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

  
)}




export default ProductTable