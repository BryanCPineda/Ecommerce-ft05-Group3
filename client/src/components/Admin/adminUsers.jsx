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
} from "../../actions/orders";

import {getAllUsers,promoteUser } from '../../actions/userAction';

function Orders({
  allOrders,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  allUsers,
  getAllUsers,
  promoteUser,
}) {
  const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss";

  const [state, setState] = useState({
    reload: false,
  });

  useEffect(() => {
    
    getAllUsers();
  
  }, [state.reload]);

  const handleUpdate = (id) => {
   
    swal({
      title: "Are you sure?",
      text: "You will Promote this Client to Admin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         console.log("oprinio el ok")
        
        promoteUser(id);
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
  return (
    <Container >
      <div>
        <div>
          <div>
            <div className="d-flex p-2 justify-content-between aling-items-center mt-4">
              <h1 style={{ color: "white" }}>Users</h1>
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
                    <th> User Id </th>
                    <th> Name </th>
                    <th> Email </th>
                    {/*<th>Created At</th>
                    <th>Update At</th>*/}
                    <th>Current Rol</th>
                    <th>Promote To</th>
                    <th>Delete User</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers &&
                    allUsers.map((user, index) => { 
                      return (
                        <tr key={index} className="text-center">
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          {/*<td>{moment(user.createdAt).format(DATE_FORMAT)}</td>
                          <td>
                            {order.createdAt === order.updatedAt
                              ? "Sin modificaciones"
                              : moment(order.updatedAt).format(DATE_FORMAT)}
                          </td>*/}
                          <td> {user.usertype}</td>
                          <td>
                            <Form.Control
                              as="select"
                              name="Rol"
                              onChange={() => {
                                handleUpdate(user.id);
                              }}
                            >
                              {/*{onClick={()=> {handleUpdate(order.id)} */}
                              <option value="null">Select a New Rol</option>
                              <option value="Admin">Admin</option>
                            </Form.Control>
                          </td>

                          <td>
                            <Button
                              onClick={() => handleDelete(user.id)}
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
              {allUsers && allUsers.length < 1 && (
                <div className="alert alert-info">No Users to Show.</div>
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
    allUsers: state.userReducer.allUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    updateOrder: (state) => dispatch(updateOrder(state)),
    promoteUser: (id) => dispatch(promoteUser(id)),
    deleteOrder: (id) => dispatch(deleteOrder(id)),
    getAllUsers: () => dispatch(getAllUsers()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
