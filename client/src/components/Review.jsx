import React from 'react';
import Style from './Review.css';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Carousel, Button, Form  } from "react-bootstrap";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'


function Review({reviews, oneStarReviews, twoStarReviews, threeStarReviews, fourStarReviews, fiveStarReviews}) {
  
  const num = Math.floor(Math.random() * 100)
  var promedio = Math.floor(Math.random()*(5*10-1*10)+1*10)/(1*10);
  return (
    <div>
      <Container>
        <h2>
          Opiniones sobre el producto
        </h2>
        <Row>
          <Col>
            <div>
              <div>
                <h2>
                  {promedio}
                </h2>
                <div>
                  {
                    promedio===1 ? (
                      <div>
                      <BsStarFill/>
                      <BsStar/>
                      <BsStar/>
                      <BsStar/>
                      <BsStar/>
                      </div>
                    ) :
                      promedio<2 ? (
                        <div>
                        <BsStarFill/>
                        <BsStarHalf/>
                        <BsStar/>
                        <BsStar/>
                        <BsStar/>
                        </div>
                      ) :
                        promedio===2 ? (
                          <div>
                          <BsStarFill/>
                          <BsStarFill/>
                          <BsStar/>
                          <BsStar/>
                          <BsStar/>
                          </div>
                        ) :
                          promedio<3 ? (
                          <div>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarHalf/>
                            <BsStar/>
                            <BsStar/>
                          </div>
                          ) : 
                            promedio===3 ? (
                            <div>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStar/>
                              <BsStar/>
                            </div>
                            ) : 
                              promedio<4 ? (
                                <div>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarHalf/>
                                <BsStar/>
                                </div>
                              ) : 
                                promedio===4 ? (
                                  <div>
                                  <BsStarFill/>
                                  <BsStarFill/>
                                  <BsStarFill/>
                                  <BsStarFill/>
                                  <BsStar/>
                                  </div>
                                ) : 
                                  promedio<5 ? (
                                    <div>
                                    <BsStarFill/>
                                    <BsStarFill/>
                                    <BsStarFill/>
                                    <BsStarFill/>
                                    <BsStarHalf/>
                                    </div>
                                  ) : 
                                    (
                                    <div>
                                      <BsStarFill/>
                                      <BsStarFill/>
                                      <BsStarFill/>
                                      <BsStarFill/>
                                      <BsStarFill/>
                                    </div>
                                    )
                  }
                </div>
                <div>
                  <i>Promedio entre {num*5} opiniones</i>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <ul className='calList'>
              <li>
                <div>
                  5 estrellas
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;Barra
                </div>
                <div>
                  &nbsp;&nbsp;{num}
                </div>
              </li>
              <li>
                <div>
                  4 estrellas
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;Barra
                </div>
                <div>
                  &nbsp;&nbsp;{num}
                </div>
              </li>
              <li>
                <div>
                  3 estrellas
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;Barra
                </div>
                <div>
                  &nbsp;&nbsp;{num}
                </div>
              </li>
              <li>
                <div>
                  2 estrellas
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;Barra
                </div>
                <div>
                  &nbsp;&nbsp;{num}
                </div>
              </li>
              <li>
                <div>
                  1 estrellas
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;Barra
                </div>
                <div>
                  &nbsp;&nbsp;{num}
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {
    // reviews: state.reviews.rows.data,
    // oneStarReviews: state.oneStarReviews.count,
    // twoStarReviews: state.twoStarReviews.count,
    // threeStarReviews: state.threeStarReviews.rows.count,
    // fourStarReviews: state.fourStarReviews.rows.count,
    // fiveStarReviews: state.fiveStarReviews.rows.count
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    // getProductReviews: ()=> dispatch(getProductReviews()),
    // getOneStarReviews: ()=> dispatch(getOneStarReviews()),
    // getTwoStarsReviews: ()=>dispatch(getTwoStarsReviews()),
    // getThreeStarsReviews: ()=>dispatch(getThreeStarsReviews()),
    // getFourStarsReviews: ()=>dispatch(getFourStarsReviews()),
    // getFiveStarsReviews: ()=>dispatch(getFiveStarsReviews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);