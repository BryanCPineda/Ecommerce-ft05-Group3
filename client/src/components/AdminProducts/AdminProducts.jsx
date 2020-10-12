import React, { useEffect, useState } from 'react'
import Axios from 'axios'
//components
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { FiPlus } from 'react-icons/fi'
import Create from './Create'
import List from './List'



function AdminProducts() {
        const initialFormState = [{ id: null, name: '', description: '' , price: null, stock: null, images: '', categories: ''}]
        const [state, setState] = useState({
                creating: false,
                products: initialFormState,
                totalProducts: 0
        });
        let products = ''

        // Agregar un producto---------------------------
        async function createProduct (prod) {
                const prodEnviar = {
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        stock: prod.stock,
                        categories:'',
                        images: ''
                    }
                            
                const res = await Axios.post('http://localhost:4000/products', prodEnviar)
                            
        }


        // Traer productos de la base de datos -------------
        async function getProducts() {
            const res = await Axios.get('http://localhost:4000/products')
             products = res.data
             
             setState({
                products: res.data.rows,
                totalProducts: res.data.rows.length,
            })
            
        }
        // Trear las categorias de la base de datos----------


        const handleCreating = () => {
                setState({
                        ...state,
                        creating: !state.creating
                })
                // creating: !state.creating
        }

        const handleCreate = () => {
                // switchLoading(true);
                handleCreating();
                return attributes => {
                        createProduct(attributes)
                                .then(() => {
                                        getProducts();
                                
                                })
                }
        }

        useEffect(() => {

                getProducts()

        }, []);


        return (
                <Container fluid>
                        {/* <Loading /> */}
                        <Create show={state.creating} createProduct={handleCreate} handleClose={handleCreating} />
                        <Row>
                                <Col>
                                        <div className="d-flex p-2 justify-content-between aling-items-center">
                                                <h1>Productos</h1>
                                                <span>
                                                        <Button onClick={handleCreating}  
                                                        style={{backgroundColor: '#A855DE', color: '#ffffff', border: '#8a2be2',
                                                        padding: '5px 10px 5px 10px'}}
                                                        className="m-1" 
                                                        >
                                                        <FiPlus /> Añadir producto</Button>
                                                </span>
                                        </div>
                                </Col>
                        </Row>
                        <Row>
                                <Col>
                                        {state.products.length > 0 && <List products={state.products} />}
                                </Col>
                        </Row>
                </Container>
        )
}
export default AdminProducts
