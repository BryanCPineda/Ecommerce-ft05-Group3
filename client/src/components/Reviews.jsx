import React from 'react';
import './Reviews.css';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Carousel, Button, Form  } from "react-bootstrap";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'


function Review({
  // reviews, oneStarReviews, twoStarReviews, threeStarReviews, fourStarReviews, fiveStarReviews
}) {
  // var promedio = Math.floor(Math.random()*(5*10-1*10)+1*10)/(1*10); 
  const oneStarReviews = Math.floor(Math.random() * 100);
  const twoStarReviews = Math.floor(Math.random() * 100);
  const threeStarReviews = Math.floor(Math.random() * 100);
  const fourStarReviews = Math.floor(Math.random() * 100);
  const fiveStarReviews = Math.floor(Math.random() * 100);
  const totalReviews = 
    oneStarReviews+
    twoStarReviews+
    threeStarReviews+
    fourStarReviews+
    fiveStarReviews;
  const totalStars = 
    oneStarReviews+
    (twoStarReviews * 2)+
    (threeStarReviews * 3)+
    (fourStarReviews * 4)+
    (fiveStarReviews * 5);
  
  let promedio = totalStars / totalReviews;
  promedio = promedio.toFixed(1);
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
                <h1>
                  {promedio}
                </h1>
                <div >
                  {
                    promedio===1 ? (
                      <div className='bsStars'>
                      <BsStarFill/>
                      <BsStar/>
                      <BsStar/>
                      <BsStar/>
                      <BsStar/>
                      </div>
                    ) :
                      promedio<2 ? (
                        <div className='bsStars'>
                        <BsStarFill/>
                        <BsStarHalf/>
                        <BsStar/>
                        <BsStar/>
                        <BsStar/>
                        </div>
                      ) :
                        promedio===2 ? (
                          <div className='bsStars'>
                          <BsStarFill/>
                          <BsStarFill/>
                          <BsStar/>
                          <BsStar/>
                          <BsStar/>
                          </div>
                        ) :
                          promedio<3 ? (
                          <div className='bsStars'>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarHalf/>
                            <BsStar/>
                            <BsStar/>
                          </div>
                          ) : 
                            promedio===3 ? (
                            <div className='bsStars'>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStar/>
                              <BsStar/>
                            </div>
                            ) : 
                              promedio<4 ? (
                                <div className='bsStars'>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarHalf/>
                                <BsStar/>
                                </div>
                              ) : 
                                promedio===4 ? (
                                  <div className='bsStars'>
                                  <BsStarFill/>
                                  <BsStarFill/>
                                  <BsStarFill/>
                                  <BsStarFill/>
                                  <BsStar/>
                                  </div>
                                ) : 
                                  promedio<5 ? (
                                    <div className='bsStars'>
                                    <BsStarFill/>
                                    <BsStarFill/>
                                    <BsStarFill/>
                                    <BsStarFill/>
                                    <BsStarHalf/>
                                    </div>
                                  ) : 
                                    (
                                    <div className='bsStars'>
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
                  <i>Promedio entre {totalReviews} opiniones</i>
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
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span className='filled'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  &nbsp;&nbsp;{fiveStarReviews}
                </div>
              </li>
              <li>
                <div>
                  4 estrellas
                </div>
                <div>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span className='filled'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  &nbsp;&nbsp;{fourStarReviews}
                </div>
              </li>
              <li>
                <div>
                  3 estrellas
                </div>
                <div>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span className='filled'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                </div>
                <div>
                  &nbsp;&nbsp;{threeStarReviews}
                </div>
              </li>
              <li>
                <div>
                  2 estrellas
                </div>
                <div>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <span className='filled'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    </div>
                  </div>
                <div>
                  &nbsp;&nbsp;{twoStarReviews}
                </div>
              </li>
              <li>
                <div>
                  1 estrellas
                </div>
                  <div>
                      &nbsp;&nbsp;&nbsp;
                    <span className='filled'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                <div>
                  &nbsp;&nbsp;{oneStarReviews}
                </div>
              </li>
            </ul>
          </Col>
        </Row>
        <hr/>
        <Row>
          <div>
            {
              // reviews.map(review=>{
              //   return (
              //     reviews.qualification===1 ? (
              //       <BsStarFill/>
              //     ) :
              //       reviews.qualification===2 ? (
              //         <div>
              //           <BsStarFill/>
              //           <BsStarFill/>
              //         </div>
              //       ) : 
              //         reviews.qualification===3 ? (
              //           <div>
              //             <BsStarFill/>
              //             <BsStarFill/>
              //             <BsStarFill/>
              //           </div>
              //         ) : 
              //           reviews.qualification===4 ? (
              //             <div>
              //               <BsStarFill/>
              //               <BsStarFill/>
              //               <BsStarFill/>
              //               <BsStarFill/>
              //             </div>
              //           ) : 
              //             (
              //               <div>
              //                 <BsStarFill/>
              //                 <BsStarFill/>
              //                 <BsStarFill/>
              //                 <BsStarFill/>
              //                 <BsStarFill/>
              //               </div>
              //             ) 
              //   )
              // })
            }
          </div>
          <div>
            {
              // reviews.map(review=>{
              //   return (
              //     <p>
              //       {review.description}
              //     </p>
              //   )
              // })
            }
          </div>
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