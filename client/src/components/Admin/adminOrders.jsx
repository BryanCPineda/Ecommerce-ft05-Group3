import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Alert, Form } from 'react-bootstrap';
import moment from 'moment';
import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import { connect } from 'react-redux';

//-------------------Redux-----------------//
import {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} from '../../actions/orders';

function Orders({allOrders, getAllOrders, createOrder, updateOrder, deleteOrder }){

    const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss"
    const [state, setState] = useState({
        status: "",
    });
    
    useEffect(() =>{
                     getAllOrders();
    }, []);

    const handleSelect = (e) => {
        setState({
            status: e.target.value
        })
    }

    const handleChange = (e) => {
        
        console.log(state);
    }

    const handleDelete = (e) => {

        console.log(state);
    }



    return (
            <Container fluid>
                        <Row>
                            <Col>
                                <div className="d-flex p-2 justify-content-between aling-items-center">
                                    <h1>Orders</h1>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="table-responsive" >
                                    <table className="table table-ligth table-sm table-striped table-bordered table-hover">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Order Id</th>
                                                <th>Created By</th>
                                                <th>Created At</th>
                                                <th>Update At</th>
                                                <th>Total Price</th>
                                                <th>Current Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           { allOrders.orders && allOrders.orders.map((order, index) =>{
                                                return (
                                                    <tr key={index} className="text-center">
                                                        <td>{order.id}</td>    
                                                        <td>{"Not allowed"}</td> {/**AQUI LO IDEAL ES MOSTRAR EL EMAIL DEL USUARIO*/}
                                            {/* Las siguientes dos líneas formatean la fecha recibida de la base de datos para hacerla más amigable */}
                                                        <td>{moment(order.createAt).format("DD/MM/YYYY - HH:mm:ss")}</td>    
                                                        <td>{order.createdAt === order.updatedAt ? "Sin modificaciones" : moment(order.updatedAt).format("DD/MM/YYYY - HH:mm:ss")}</td>    
                                                        <td>{(order.totalPrice)} </td>
                                                        <td> {order.status}                       
                                                        {/*<Form.Control as="select" name="status" onChange={handleSelect} defaultValue={order.status}>
                                                            <option value="Cart">Cart</option>
                                                            <option value="Created">Created</option>
                                                            <option value="Processing">Processing</option>
                                                            <option value="Complete">Complete</option>
                                                            <option value="Canceled">Canceled</option>
                                                        </Form.Control>*/}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                       </tbody>
                                    </table>
                                    {allOrders.orders && allOrders.orders.length < 1 && (<div className="alert alert-info">No hay órdenes creadas.</div>)}
                                </div>
                            </Col>
                        </Row>
                    </Container>

    )

}

function mapStateToProps(state) {
    return {
           allOrders: state.ordersReducer.orders
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getAllOrders: () => dispatch(getAllOrders()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);