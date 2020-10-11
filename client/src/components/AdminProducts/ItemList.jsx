import Edit from './Edit';
import AddImages from './AddImages'
// import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
// import ConfirmDelete from './ConfirmDelete';
import { Button, Modal, Card, Badge } from 'react-bootstrap'
// import { switchLoading } from '../../actions/global';
import { FiTrash2, FiEdit3, FiExternalLink } from 'react-icons/fi';
// import { deleteProduct, updateProduct, getProducts, addCategoryToProduct, deleteCategoryToProduct } from '../../actions/products';
// import { getProducts, deleteProduct, updateProduct, addCategoryToProduct, deleteCategoryToProduct } from '../../actions/products';


function ItemList({ product}) {
    //product, deleteProduct, updateProduct, getProducts, allCategories, addCategoryToProduct, deleteCategoryToProduct
    const { id, name, categories, stock, price, images } = product;

    const [categorias, setCategorias] = useState('')

    const [state, setState] = useState({
        editing: false,
        deleting: false
    });

    //----------------------------agregar imagenes
    const [show, setShow] = useState(false);
    const [imagen, setImagen] = useState([])
    const [imageUp, setImageUp] = useState(false)
    const handleClose = () => {
        setShow(false)
        setImageUp(true)
        console.log('setImageUp')
      }

    const handleCloseCancel = () => {
        setShow(false)
      }
    const handleShow = () => setShow(true);

    async function agregarImagenDB(){
        const imgEnviar = {
            productId: id,
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

    //---------------------------------------


    async function deleteProduct(id) {
        console.log('delete',id)
          const res = await Axios.delete('http://localhost:4000/products/'+id)
          console.log('res delete', res)

        }

        // server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
        //     //add the category to the product
        //     const { idProducto, idCategoria } = req.params;
        async function addCategoryToProduct(cat, id) {
                        
            const res = await Axios.post('http://localhost:4000/products/'+id+'/category/'+cat)
                            console.log('rescreate', res.data)
            }
    
    
        const handleDeleteCategories = (idCat) =>{
            deleteCategoryToProduct(idCat, id)
        }

        async function deleteCategoryToProduct(cat, id) {
                        
                const res = await Axios.delete('http://localhost:4000/products/'+id+'/category/'+cat)
                                // window.alert('resdelete', res.data)    
                                document.location.reload();         
        }


        async function updateProduct(id, prod) {
            const prodEnviar = {
                name: prod.name,
                description: prod.description,
                price: prod.price,
                stock: prod.stock,
                categories:'',
                images: ''
        }
            const res = await Axios.put('http://localhost:4000/products/'+id, prodEnviar)
            console.log('respuesta update', res)
        }

    const imagenes = images && images.map(e => e.image)
    console.log(name, '---',imagenes)

    async function getCategories() {
        const res = await Axios.get('http://localhost:4000/category')
        //  console.log('resasync_cat', res.data)
        setCategorias(res.data)
        
    }

    const handleImage = () => {}

    const handleEditing = () => {
        setState({
            ...state,
            editing: !state.editing
        })
    }


    const handleDelete = () => {

            deleteProduct(id).then(() => {
                window.alert('producto borrado')
                document.location.reload();
            });

    }

    const handleUpdate = () => {
        handleEditing();
        // switchLoading(true);
        return (id, attributes) => {
            for (let item of attributes.categories) {
                addCategoryToProduct(item, id);
            }
            for (let item of attributes.categoriesToDelete) {
                deleteCategoryToProduct(item, id);
            }
            updateProduct(id, attributes).then(() => {
                document.location.reload();
            });

        }
    }

    useEffect(() => {

            getCategories()
 
    }, [])

    return (
        <tr className="text-center">
            {/* <ConfirmDelete deleteProduct={handleDelete} product={{ id, name, image }} show={state.deleting} handleClose={handleDeleting} /> */}
            <Edit allCategories={categorias} updateProduct={handleUpdate} show={state.editing} product={product} handleClose={handleEditing} />
            <td className="align-middle" width="70">
                {imagenes && imagenes.map(e => <img alt={'Imagen del producto' + name} width="64" className="img-thumbnail" src={e} />)}
            </td>
            <td className="align-middle">{name}</td>
            <td className="align-middle" style={{ maxWidth: "100px" }}>{categories && categories.length > 0 ? categories.map(category => (
                // <span key={category.id} className="badge badge-dark" style={{ margin: "3px" }}>{category.name}</span>
                <Badge variant="light">{category.name}   <Button size="sm" variant='dark'onClick={() => handleDeleteCategories(category.id)}>x</Button ></Badge>
            )) : <span>Sin categorías</span>}</td>
            <td className="align-middle">{stock}</td>
            <td className="align-middle">{price}</td>
            <td className="align-middle">
                {/* <Link to={"/productos/" + id} className="m-1 btn btn-light btn-sm" title="Ver en el catálogo"><FiExternalLink /></Link> */}
                <Button size="sm" onClick={handleEditing} className="m-1" title="Modificar" variant="light"><FiEdit3 /></Button>
                <Button size="sm" onClick={handleDelete} className="m-1" title="Borrar" variant="dark"><FiTrash2 /></Button>
                <Button size="sm"
                    onClick={() => {
                      setShow(true)

                    }}
                    style={{backgroundColor: '#8a2be2', color: '#000000'}}
                    className="m-1" 
                    >
                    + Imagenes
                </Button>

                {/* Agregar imagenes ------------------------------------------ */}
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
                        <Button variant="secondary" onClick={handleCloseCancel}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                </Modal>
                {/* Agregar imagenes ------------------------------------------ */}
            </td>
        </tr>
    );
}

export default ItemList