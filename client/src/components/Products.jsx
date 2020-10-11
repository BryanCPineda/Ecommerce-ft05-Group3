import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Carousel, Button, Form } from "react-bootstrap";
import s from "./product.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import NumberFormat from "react-number-format";
//import { connect } from "react-redux";
//import { getProduct, getReviews, getAverage, createReview } from "../../actions/products";
//import { addProductToCart as setProductToGuestCart } from '../../actions/guest';
//import { setProductToCart } from "../../actions/users";
//import Error404 from '../Error404'
//import Review from '../Review';
//import Rating from 'react-rating';
import { MdStar } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { AiFillCloseSquare } from 'react-icons/ai';
import axios from 'axios'; 
 
export default function Product(props){ 

 // let mapeo = data.products.filter(ele => ele.id = = props.match.params.id )
 const mapeo =  props.match.params.id;
 const [product,setProduct]=useState({});
 
  
  function mostrarProducto(){
  axios.get("http://localhost:4000/products/"+mapeo)
  .then(res=>
    res.data
  )
  .then(res=>{
    setProduct(res);
   }
  )
}

  useEffect(() => {
   mostrarProducto();
 },[]);
  
    
  
  return( 
    <Container>
    {product ? (
        <React.Fragment>
            <Row className="mb-4">
                <Col className="">
                    <Card className="bg-dark2">
                        <Card.Header className="">
                            <h1 className="">{product.name + " "}</h1>
                            {product.stock ? (
                                <span className="badge badge-primary badge-pill text-uppercase">
                                    Stock: {product.stock}
                                </span>
                            ) : (
                                    <span className="badge badge-danger badge-pill text-uppercase">
                                        Agotado
                                    </span>
                                )}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {/*<Col md={12} lg={4} className="mb-4  text-center">
                                    <Card className="h-100 bg-transparent border-0">
                                        <Card.Body>
                                            <div className={s["main-img-cover"] + " rounded"}>
                                                {product.images && (
                                                    <img
                                                        alt={'Imagen del producto ' + product.name}
                                                        src={product.images[0].image}
                                                        className="shadow rounded"
                                                    />
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>*/}
                              
                              
                                <Col md={12} lg={8} className="mb-4">
                                    <Card className="h-100 bg-transparent border-0">
                                        <Card.Body>
                                            <Carousel
                                                className={
                                                    s["bootstrap-carousel"] + " m-auto shadow"
                                                }
                                            >
                                                {product.images &&
                                                      product.images.map((image, index) => {
                                                        if (index !== -1) {
                                                            return (
                                                                <Carousel.Item key={index}>
                                                                    <div
                                                                        className={
                                                                            s["cover-image"] + " rounded bg-dark"
                                                                        }
                                                                    > 
                                                                        <img src={image.image} alt={'Imagen ' + (index + 1) + ' del producto: ' + product.name}  />
                                                                    </div>
                                                                </Carousel.Item>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                            </Carousel>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card className="bg-dark2">
                        <Card.Body>
                            <Row>
                                <Col className="col-4">
                                    <span className={s.price}>
                                        <NumberFormat
                                            prefix="$"
                                            value={product.price}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType={"text"}
                                        />
                                    </span>
                                </Col>
                                <Col className="col-3">
                                    {/*<Form.Control /> */}
                                    {/*{product.stock > 0 && !state.isAdded && (
                                        <Form.Control
                                            value={state.quantity}
                                            onChange={onChangeQuantity}
                                            min="1"
                                            max={product.stock}
                                            type="number"
                                            className="form-control-lg"
                                        />
                                    )}*/}
                                </Col>
                                <Col>
                                      <Button>
                                        Agregar al carrito
                                        <CgShoppingCart className="mr-1" />
                                      </Button>
                                    {/*{product.stock > 0 && !state.isAdded && (<Button onClick={handleSetToCart} size="lg" block variant="primary">
                                        <CgShoppingCart className="mr-1" />
                  Agregar al carrito
                                    </Button>)}*/}

                                    {/*{product.stock > 0 && state.isAdded && (<div>
                                        <Link to="/carrito" className="btn btn-primary btn-lg btn-block">
                                            <CgShoppingCart className="mr-1" />
                  Ir al carrito
              </Link>
                                        <small>Ya añadiste este producto al carrito</small>
                                    </div>)}*/}

                                    {product.stock < 1 && (
                                        <Button size="lg" block variant="primary" disabled>
                                            ¡Producto agotado!
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card className="border-0 bg-dark2">
                        <Card.Header>Descripción</Card.Header>
                        <Card.Body>
                            <p className="lead">{product.description}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                {/*<Col>
                    <Card className="bg-dark h-100">
                        <Card.Header className="d-flex justify-content-between">Reseñas <Rating
                            initialRating={avg}
                            readonly="true"
                            emptySymbol={<MdStar style={{ color: "grey", fontSize: "1.5rem" }} />}
                            fullSymbol={<MdStar style={{ color: "#ffb900", fontSize: "1.5rem" }} />}
                        /></Card.Header>
                        {token ?
                            <Card.Body>
                                {(reviews && !userReviewExist) &&
                                    <Row className={state.showReviewForm ? "d-block" : "d-none"}>
                                        <Col className="mb-3">
                                            <div className="text-right">
                                                <AiFillCloseSquare size={20} className="close-icon" onClick={() => handleReviewForm()} />
                                            </div>
                                            <Form onSubmit={handleSubmit(onSubmit)}>
                                                <Form.Group className="mb-2">
                                                    <Rating
                                                        initialRating={state.rating}
                                                        emptySymbol={<MdStar style={{ color: "grey", fontSize: "1.5rem" }} />}
                                                        fullSymbol={<MdStar style={{ color: "#ffb900", fontSize: "1.5rem" }} />}
                                                        onChange={(rate) => handleRating(rate)}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-2">
                                                    <Form.Control
                                                        as="textarea"
                                                        autoComplete="off"
                                                        className={errors.review ? " is-invalid textarea" : ""}
                                                        ref={register({
                                                            required: true,
                                                            minLength: 20,
                                                            maxLength: 200,
                                                            pattern: regRules.review
                                                        })}
                                                        type="text"
                                                        name="review"
                                                        placeholder="Escribe una reseña"
                                                    ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.review?.type === "required" &&
                                                            "Debes agregar un comentario"}
                                                        {errors.review?.type === "pattern" &&
                                                            "No se admiten caracteres especiales"}
                                                        {errors.review?.type === "minLength" &&
                                                            "Tu reseña no puede ser menor a 20 caracteres"}
                                                        {errors.review?.type === "maxLength" &&
                                                            "Tu reseña no puede ser mayor a 200 caracteres"}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button
                                                    type="submit"
                                                    className="m-auto"
                                                >Agregar reseña
                                        </Button>
                                            </Form>
                                        </Col>
                                    </Row>}
                                <div className={state.showReviewForm ? "d-none" : "d-block"}>
                                    <Row>
                                        {!userReviewExist && <Col className={!state.showReviewForm ? "d-block" : "d-none"}><Link to="#" className="text-white" onClick={() => handleReviewForm()}>Agregar reseña</Link></Col>}
                                        <Col><small className="d-flex flex-row-reverse">{avgReviews && totalReviews === 1 ? totalReviews + " calificación" : totalReviews + " calificaciones"}</small></Col>
                                    </Row>
                                </div>

                                {reviews.length > 0 ? reviews.map(review => (
                                    <Review key={review.id} props={review} />
                                )) :
                                    <span className={!state.showReviewForm ? "d-block" : "d-none"}>No hay comentarios sobre este producto. <Link to="#" className="text-white" onClick={() => handleReviewForm()}>¡Sé el primero!</Link></span>}

                            </Card.Body> :
                            <Card.Body>
                                <Link to="/ingresar">Inicia sesión</Link> o <Link to="/registrarse">crea una cuenta</Link> para ver las reseñas de los usuarios sobre este producto y agregar la tuya
                            </Card.Body>}

                    </Card>
                </Col>*/}
                <Col md={4}>
                    <Card className="bg-dark h-100">
                        <Card.Header>Categorías</Card.Header>
                        <Card.Body>
                            {product.categories &&
                                product.categories.map((item) => (
                                    <Link
                                        key={item.id}
                                        to="#"
                                        className="text-muted2 m-1 badge badge-dark2 badge-pill"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    ) : 
    <h1>ERROR 404</h1>
     
    } 
    {/*{   <Error404 />}*/}
</Container>

  )
};