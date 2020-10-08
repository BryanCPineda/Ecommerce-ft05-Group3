import React, { useState } from 'react'
import ProductTable from './ProductTable'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import {Container, Row, Col, Modal, Button} from 'react-bootstrap'

const CrudShow = () => {
    const productData = [
        { id: 1, name: 'Producto 1', description: 'Este producto es el producto 1', price: 320.00 , stock: 10 , img: ''},
        { id: 2, name: 'Producto 2', description: 'Este producto es el producto 2', price: 480.00 , stock: 12 , img: '' },
        { id: 3, name: 'Producto 3', description: 'Este producto es el producto 3', price: 512.00 , stock: 14 , img: '' },
      ]
    
      const [prods, setProds] = useState(productData)
      const [editing, setEditing] = useState(false)
      const initialFormState = { id: null, name: '', description: '' , price: null, stock: null}
      const [currentProduct, setCurrentProduct] = useState(initialFormState)
      // ventana modal edit product---------------
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
    //   const handleShow = () => setShow(true);
      //----------------------------------------
       // ventana modal add product
       const [addShow, setAddShow] = useState(false);

       const handleCloseAdd = () => setAddShow(false);
    //    const handleShowAdd = () => setAddShow(true);
       //----------------------------------------
    
      const addProduct = (prod) => {
        prod.id = prods.length + 1
        setProds([...prods, prod])
      }

      const deleteUser = (id) => {
        setProds(prods.filter((prod) => prod.id !== id))
      }

      const editRow = (prod) => {
        setEditing(true)
        setShow(true)
        setCurrentProduct({ id: prod.id, name: prod.name, description: prod.description, price: prod.price, stock: prod.stock })
      }

      const updateProd = (id, updatedProd) => {
        setEditing(false)
      
        setProds(prods.map((prod) => (prod.id === id ? updatedProd : prod)))
      }
      
  return (
    <Container fluid>
        <Row>
            <Col>
                {editing ? (
                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Editar Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditProduct
                                    setEditing={setEditing}
                                    currentProduct={currentProduct}
                                    updateProd={updateProd}
                                />
                        </Modal.Body>
                      </Modal>
                        
                        // <div>
                        // <h2>Editar Producto</h2>
                        //     <EditProduct
                        //         setEditing={setEditing}
                        //         currentProduct={currentProduct}
                        //         updateProd={updateProd}
                        //     />
                        // </div>
                    ) : (
                        <Modal show={addShow} onHide={handleCloseAdd}>
                        <Modal.Header closeButton>
                          <Modal.Title>Agregar Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddProduct addProduct={addProduct} onHide={handleCloseAdd}/>
                        </Modal.Body>
                      </Modal>
                        // <div>
                        // <h2>Agregar Producto</h2>
                        // <AddProduct addProduct={addProduct} />
                        // </div>
                    )}
            </Col>
        </Row>
        <Row>
            <Col>
            <h4>Listado de Productos</h4>
            <ProductTable prods={prods} deleteUser={deleteUser} editRow={editRow}/>
            </Col>
        </Row>
        <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
                <Button 
                onClick={()=>
                    setAddShow(true)
                }
                >
                    Agregar Producto
                </Button>
            </Col>
        </Row>
    </Container>
  )
}

export default CrudShow
