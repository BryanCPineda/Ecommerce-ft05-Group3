import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import moment from "moment";
import { FiTrash2, FiEdit, FiEye, FiCheckCircle } from "react-icons/fi";
import { connect } from "react-redux";
import swal from "sweetalert";

//-------------------Redux-----------------//
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  filterOrders,
} from "../../actions/orders";

function Orders({
  allOrders,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  filterOrders,
}) {
  const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss";

  const [state, setState] = useState({
    reload: false,
  });

  useEffect(() => {
    getAllOrders();
  }, [state.reload]);

  const handleUpdate = (e, id) => {
    const stateSend = {
      status: e.target.value,
      orderId: id,
    };
    swal({
      title: "Are you sure?",
      text: "Once Changed, This Could Be Affect The Client Experience",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        updateOrder(stateSend);
        swal("Your Order has been changed!", {
          icon: "success",
        }).then(() => {
          setState({
            reload: !state.reload,
          });
        });
      }
    });
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Deleted, you will not be able to recover this Order",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteOrder(id);
        swal("Your Order has been deleted!", {
          icon: "success",
        }).then(() => {
          setState({
            reload: !state.reload,
          });
        });
      }
    });
  };

  const stateOrders = [ " ", "-", "Cart", "Created", "Processing", "Canceled", "Complete" ]

  const handleFilterOrders = (e) => {
    if(e.target.value === "-") {
      getAllOrders();
    }
    filterOrders(e.target.value)
  }

  return (
    <Container >
      <div>
        <div>
          <div>
            <div className="d-flex p-2 justify-content-between aling-items-center mt-5">
              <h1 style={{ color: "white" }}>Orders</h1>
              {/* <Form>
                <Form.Group className="d-flex">
                  <Form.Label className="mr-2" style={{color: 'white', fontSize: '25px', width: '300px'}}>Filter Orders:</Form.Label>
                  <Form.Control style={{color: 'black'}} as="select" value={stateOrders} onChange={handleFilterOrders}>
                  {stateOrders.map((order, index) => (
                    <option style={{color: 'black'}} key={index}>{order}</option>
                  ))}
                  </Form.Control>
                </Form.Group>
              </Form> */}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div
              className="table-responsive"
              style={{ backgroundColor: "white" }}
            >
              <table className="table table-ligth table-sm table-bordered table-hover">
                <thead>
                  <tr className="text-center">
                    <th>Order Id</th>
                    <th>Created By</th>
                    <th> Email </th>
                    <th>Created At</th>
                    <th>Update At</th>
                    <th>Total Price</th>
                    <th>Current Status</th>
                    <th>Change Status</th>
                    {/*<th> Confirm </th>*/}
                    <th>Delete Order</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders &&
                    allOrders.map((order, index) => {
                      return (
                        <tr key={index} className="text-center">
                          <td>{order.id && order.id}</td>
                          <td>{order.user.name}</td>
                          <td>{order.user.email}</td>
                          <td>{moment(order.createdAt).format(DATE_FORMAT)}</td>
                          <td>
                            {order.createdAt === order.updatedAt
                              ? "Sin modificaciones"
                              : moment(order.updatedAt).format(DATE_FORMAT)}
                          </td>
                          <td>{order.totalPrice} </td>
                          <td> {order.state}</td>
                          <td>
                            <Form.Control
                              as="select"
                              name="status"
                              onChange={(e) => {
                                handleUpdate(e, order.id);
                              }}
                            >
                              {/*{onClick={()=> {handleUpdate(order.id)} */}
                              <option value="null">Select a New Status</option>
                              <option value="Cart">Cart</option>
                              <option value="Created">Created</option>
                              <option value="Processing">Processing</option>
                              <option value="Complete">Complete</option>
                              <option value="Canceled">Canceled</option>
                            </Form.Control>
                          </td>

                          <td>
                            <Button
                              onClick={() => handleDelete(order.id)}
                              style={{
                                backgroundColor: "#8a2be2",
                                color: "white",
                              }}
                              variant="ml-1"
                              size="md"
                            >
                              <FiTrash2 />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {allOrders && allOrders.length < 1 && (
                <div className="alert alert-info">No orders to Show.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    allOrders: state.ordersReducer.orders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    updateOrder: (state) => dispatch(updateOrder(state)),
    deleteOrder: (id) => dispatch(deleteOrder(id)),
    filterOrders: (state) => dispatch(filterOrders(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
