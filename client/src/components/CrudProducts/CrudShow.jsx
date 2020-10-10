import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ProductTable from './ProductTable'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import {Container, Row, Col, Modal, Button} from 'react-bootstrap'
import './ProductCrud.css'

const CrudShow = () => {

    const initialFormState = { id: null, name: '', description: '' , price: null, stock: null, images: ''}
    const [prods, setProds] = useState(initialFormState)

        // traer productos de la base de datos --------------------
    async function getProductosDB() {
          const res = await Axios.get('http://localhost:4000/products')
          console.log('resasync',res.data.rows)
          setProds(res.data.rows)
        }

    // editar un producto de la base de datos
      async function editProductsDB(prod) {
            const prodEnviar = {
              name: prod.name,
              description: prod.description,
              price: prod.price,
              stock: prod.stock
          }
          console.log('entro',prod)
            const res = await Axios.put('http://localhost:4000/products/'+prod.id, prodEnviar)
            console.log('resasync Edit',res)
            // setProds(res.data.rows)
          }

    // borrar un producto de la base de datos
    async function deleteProductsDB(id) {
    console.log('delete',id)
      const res = await Axios.delete('http://localhost:4000/products/'+id)
      console.log('resasync delete',res)
      // setProds(res.data.rows)
    }
      
      // hook que carga la informacion dentro de la base de datos
        useEffect(() => {
          getProductosDB();
        },[]);

      
      const [editing, setEditing] = useState(false)
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

      const addImages = (prod) => {
        setCurrentProduct({ id: prod.id, name: prod.name, description: prod.description, price: prod.price, stock: prod.stock, images: prod.images })
        console.log('imagessss',)
      }

      const deleteUser = (id) => {
        deleteProductsDB(id)
        setProds(prods.filter((prod) => prod.id !== id))
      }

      const editRow = (prod) => {
        setEditing(true)
        setShow(true)
        setCurrentProduct({ id: prod.id, name: prod.name, description: prod.description, price: prod.price, stock: prod.stock, images: prod.images })
      }

      const updateProd = (id, updatedProd) => {
        setEditing(false)
        
        const prodUpdate = prods.map((prod) => (prod.id === id ? updatedProd : prod))
        setProds(prodUpdate)
        editProductsDB(updatedProd)
      }

      
  return (
        <Row >
          <Col xs={2}></Col>
          <Col >
                {editing ? (
                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton style={{backgroundColor: '#7F00FF', color: 'white'}}>
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
                    ) : (
                        <Modal show={addShow} onHide={handleCloseAdd}>
                        <Modal.Header closeButton style={{backgroundColor: '#7F00FF', color: 'white'}}>
                          <Modal.Title>Agregar Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddProduct addProduct={addProduct} onHide={handleCloseAdd}/>
                        </Modal.Body>
                      </Modal>
                    )}
            <h4 className="table-categories mb-4" style={{color: 'white'}}>Listado de Productos</h4>
            <ProductTable prods={prods} addImages={addImages} deleteUser={deleteUser} editRow={editRow}/>

                <Button
                className="button button-bootstrap"
                style={{width: '10rem'}} 
                onClick={()=>
                    setAddShow(true)
                }
                >
                    Agregar Producto
                </Button>
                </Col>
                <Col xs={2}></Col>
        </Row>
  )
}

export default CrudShow
