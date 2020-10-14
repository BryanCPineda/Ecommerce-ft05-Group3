import Edit from './Edit';
import AddImages from './AddImages'
// import { connect } from 'react-redux';
import swal from 'sweetalert'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Card, Badge } from 'react-bootstrap'
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

//-------------- Redux ------------------------
import { connect } from 'react-redux';
import { getProducts, updateProduct, deleteProduct, deleteImageToProduct, deleteCategoryToProduct, agregarImagen, addCategoryToProduct } from '../../actions/product';
import { getCategories } from '../../actions/categories'



function ItemList({ product, updateProduct, deleteProduct, deleteImageToProduct, deleteCategoryToProduct, agregarImagen, allcategories, getCategories, addCategoryToProduct}) {
    const { id, name, categories, stock, price, images } = product;

    const [categorias, setCategorias] = useState('')

    const [state, setState] = useState({
        editing: false,
        deleting: false
    });

    //----------------------------este codigo maneja el agregado de imagenes------------------
    const [show, setShow] = useState(false);
    const [imagen, setImagen] = useState([])
    const [imageUp, setImageUp] = useState(false)
    const handleClose = () => {
        setShow(false)
        setImageUp(true)
      }

    const handleCloseCancel = () => {
        setShow(false)
      }
    const handleShow = () => setShow(true);

      useEffect(() => {
        if (imageUp){
        agregarImagen(id, imagen);
        setImageUp(false)
        window.location.reload()
      }
      },[imageUp]);

    //------------------------------este codigo maneja el agregado de imagenes---------

    //----------borrar imagenes---------------------
    const handleDeleteImages = (id) =>{
        deleteImageToProduct(id)
        document.location.reload(); 
    }

    
        const handleDeleteCategories = (idCat) =>{
            deleteCategoryToProduct(idCat, id)
            document.location.reload();   
        }


    const imagenes = images && images.map(e => e.image)



    const handleEditing = () => {
        setState({
            ...state,
            editing: !state.editing
        })
    }


    const handleDelete = () => {
        // alerta de borrado
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const imagesToDelete = images.map(e => e)
                deleteProduct(id).then(() => {

                    imagesToDelete.map(e => {
                        deleteImageToProduct(e.id)
                    })

                    swal("Your Product has been deleted!", {
                        icon: "success",
                      })
                    .then(() => document.location.reload())
                });
              
            } 
          })

            

    }

    const handleUpdate = () => {
        handleEditing();
        // switchLoading(true);
        return (id, attributes) => {
            for (let item of attributes.categories) {
            //    addCategoryToProduct(item, id);
            }
            for (let item of attributes.categoriesToDelete) {
            //   deleteCategoryToProduct(item, id);
            }
            updateProduct(id, attributes).then(() => {
                swal("Product Updated!", "", "success")
                .then(() => document.location.reload())
                
            });

        }
    }

    useEffect(() => {

            getCategories()
 
    }, [])

    useEffect(() => {

        setCategorias(allcategories)

    }, [allcategories])

    return (
        <tr className="text-center">
            <Edit allCategories={categorias} updateProduct={handleUpdate} show={state.editing} product={product} handleClose={handleEditing} />
            <td className="align-middle" width="150">
                {images && images.map(e => 
                 <span className='d-flex' className="align-middle"> <img alt={'Imagen del producto' + name} width="64" className="img-thumbnail" src={e.image} />
                <Button size="sm" 
                style={{backgroundColor: '#767474', color: '#ffffff', border: '#767474',
                    padding: '0px 5px 0px 5px', margin: '2px'}}
                    className="m-1"
                    onClick={() => handleDeleteImages(e.id)}
               >x</Button >
               </span>
                )}
            </td>
            <td className="align-middle">{name}</td>
            <td className="align-middle" style={{ maxWidth: "100px" }}>{categories && categories.length > 0 ? categories.map(category => (
                <Badge variant="light">{category.name}   <Button size="sm" 
                style={{backgroundColor: '#767474', color: '#ffffff', border: '#767474',
                    padding: '0px 5px 0px 5px'}}
                    className="m-1"
                onClick={() => handleDeleteCategories(category.id)}>x</Button ></Badge>
            )) : <span>There are not categories</span>}</td>
            <td className="align-middle">{stock}</td>
            <td className="align-middle">{price}</td>
            <td className="align-middle">
                <Button size="sm" onClick={handleEditing} className="m-1" style={{backgroundColor: '#A855DE', color: 'white'}} title="Modificar" variant="light"><FiEdit3 /></Button>
                <Button size="sm" onClick={handleDelete} className="m-1" style={{backgroundColor: '#A855DE'}} title="Borrar" variant="dark"><FiTrash2 /></Button>
                <Button size="sm"
                    onClick={() => {
                      setShow(true)

                    }}
                    style={{backgroundColor: '#A855DE', color: '#ffffff', border: '#8a2be2',
                    padding: '5px 10px 5px 10px'}}
                    className="m-1" 
                    >
                    + Images
                </Button>

                {/* Agregar imagenes ------------------------------------------ */}
                <Modal show={show} onHide={handleClose}>
                      <Modal.Header style={{backgroundColor: '#8a2be2'}} closeButton>
                        <Modal.Title style={{color: 'white'}} >Upload Images</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <Card>
                              <Card.Body>
                                  <AddImages img={setImagen}/>
                              </Card.Body>
                          </Card>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="button-create" onClick={handleCloseCancel}>
                          Cancel
                        </Button>
                        <Button className="button-create" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                </Modal>
                {/* Agregar imagenes ------------------------------------------ */}
            </td>
        </tr>
    );
}


function mapStateToProps(state) {
    return {
            products: state.productReducer.products,
            allcategories: state.categoriesReducer.categories
    }
}


function mapDispatchToProps(dispatch) {
    return {
            getProducts: () => dispatch(getProducts()),
            updateProduct: (id, prod) => dispatch(updateProduct(id, prod)),
            deleteProduct: (id) => dispatch(deleteProduct(id)),
            deleteImageToProduct: (id) => dispatch(deleteImageToProduct(id)),
            deleteCategoryToProduct: (idCat, id) => dispatch(deleteCategoryToProduct(idCat, id)),
            agregarImagen: (id, imagen) => dispatch(agregarImagen(id, imagen)),
            getCategories: () => dispatch(getCategories()),
            addCategoryToProduct: (cat, id) => dispatch(addCategoryToProduct(cat, id) )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);