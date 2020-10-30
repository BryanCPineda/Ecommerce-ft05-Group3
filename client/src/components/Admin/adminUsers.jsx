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
import {getAllUsers,promoteUser, deleteUser } from '../../actions/userAction';
 
function Orders({
  allUsers,
  getAllUsers,
  promoteUser,
  deleteUser,
  
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
     
        promoteUser(id);
         swal("Client Role has been changed!", {
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
      text: "Once Deleted, you will not be able to recover this User",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        console.log("eliminar el usuario")
        deleteUser(id);
        swal("User has been deleted!", {
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
                    <th>Current Rol</th>
                    <th>Promote To Admin</th>
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
                          <td> {user.usertype}</td>
                          <td>
                            <Form.Check 
                                disabled = {user.usertype === "admin" ? true : false}
                                type="checkbox"
                                label=""
                                onChange={() => {
                                handleUpdate(user.id);
                              }}
                            >
                            </Form.Check>
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
 
    promoteUser: (id) => dispatch(promoteUser(id)),  
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
