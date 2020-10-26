import React from 'react';
import './Reviews.css';
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'

function Review({reviews, oneStarReviews, twoStarsReviews, threeStarsReviews, fourStarsReviews, fiveStarsReviews}) {
{ 
  // var promedio = Math.floor(Math.random()*(5*10-1*10)+1*10)/(1*10); 
  // const oneStarReviews = Math.floor(Math.random() * 100);
  // const twoStarReviews = Math.floor(Math.random() * 100);
  // const threeStarReviews = Math.floor(Math.random() * 100);
  // const fourStarReviews = Math.floor(Math.random() * 100);
  // const fiveStarReviews = Math.floor(Math.random() * 100);
}
  const totalReviews = 
    fiveStarsReviews+
    fourStarsReviews+
    threeStarsReviews+
    twoStarsReviews+
    oneStarReviews;
  const totalStars = 
    (fiveStarsReviews * 5)+
    (fourStarsReviews * 4)+
    (threeStarsReviews * 3)+
    (twoStarsReviews * 2)+
    oneStarReviews;

  let promedio = totalStars / totalReviews;
  promedio = promedio.toFixed(1);

  return (
    <div>
      <Row>
      <Container style={{paddingBottom: '30px'}}>
      <br/>
      <Row className="justify-content-md-center">
        <Col lg="7">
          <div>
            <h1>Opiniones sobre el producto</h1>
          </div>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col sm="2"></Col>
        <Col sm="4">
          <div className='prom'>
            <div>
              <h1>
                {!isNaN(promedio) ? promedio : 0}
              </h1>
            </div>
            <div>
              {
                promedio===1 ? (
                  <div className='bigStars'>
                  <BsStarFill/>
                  <BsStar/>
                  <BsStar/>
                  <BsStar/>
                  <BsStar/>
                  </div>
                ) :
                  promedio<2 ? (
                    <div className='bigStars'>
                    <BsStarFill/>
                    <BsStarHalf/>
                    <BsStar/>
                    <BsStar/>
                    <BsStar/>
                    </div>
                  ) :
                    promedio===2 ? (
                      <div className='bigStars'>
                      <BsStarFill/>
                      <BsStarFill/>
                      <BsStar/>
                      <BsStar/>
                      <BsStar/>
                      </div>
                    ) :
                      promedio<3 ? (
                      <div className='bigStars'>
                        <BsStarFill/>
                        <BsStarFill/>
                        <BsStarHalf/>
                        <BsStar/>
                        <BsStar/>
                      </div>
                      ) : 
                        promedio===3 ? (
                        <div className='bigStars'>
                          <BsStarFill/>
                          <BsStarFill/>
                          <BsStarFill/>
                          <BsStar/>
                          <BsStar/>
                        </div>
                        ) : 
                          promedio<4 ? (
                            <div className='bigStars'>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarHalf/>
                            <BsStar/>
                            </div>
                          ) : 
                            promedio===4 ? (
                              <div className='bigStars'>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStar/>
                              </div>
                            ) : 
                              promedio<5 ? (
                                <div className='bigStars'>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarHalf/>
                                </div>
                              ) : 
                                (
                                <div className='bigStars'>
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
              <p>Promedio entre {totalReviews} opiniones</p>
            </div>
          </div>
        </Col>
        <Col sm="4">
          <ul className='calList'>
            <li>
              <div>
                5 estrellas&nbsp;&nbsp;
              </div>
              <div>
                <progress 
                  value={fiveStarsReviews*100/totalReviews} 
                  min="0" 
                  max={100}
                  className='progress'
                />
              </div>
              <div>
                &nbsp;&nbsp;{fiveStarsReviews}
              </div>
            </li>
            <li>
              <div>
                4 estrellas&nbsp;&nbsp;
              </div>
              <div>
                <progress 
                  value={fourStarsReviews*100/totalReviews} 
                  min="0" 
                  max={100}
                  className='progress'
                />
              </div>
              <div>
                &nbsp;&nbsp;{fourStarsReviews}
              </div>
            </li>
            <li>
              <div>
                3 estrellas&nbsp;&nbsp;
              </div>
              <div>
                <progress 
                  value={threeStarsReviews*100/totalReviews} 
                  min="0" 
                  max={100}
                  className='progress'
                ></progress>
              </div>
              <div>
                &nbsp;&nbsp;{threeStarsReviews}
              </div>
            </li>
            <li>
              <div>
                2 estrellas&nbsp;&nbsp;
              </div>
              <div>
                <progress 
                  value={twoStarsReviews*100/totalReviews} 
                  min="0" 
                  max={100}
                  className='progress'
                ></progress>
              </div>
              <div>
                &nbsp;&nbsp;{twoStarsReviews}
              </div>
            </li>
            <li>
              <div>
                1 estrellas&nbsp;&nbsp;
              </div>
              <div>
                <progress 
                  value={oneStarReviews*100/totalReviews} 
                  min="0" 
                  max={100}
                  className='progress'
                />
              </div>
              <div>
                &nbsp;&nbsp;{oneStarReviews}
              </div>
            </li>
          </ul>
        </Col>
        <Col sm="2"></Col>
      </Row>
      <Row>
        <Col>
          <div>
            {
              reviews && reviews.map(review=>{
                return (
                  review.qualification==='1' ? (
                    <div>
                      <div className='bsStars'>
                        <BsStarFill/>
                        <BsStar/>
                        <BsStar/>
                        <BsStar/>
                        <BsStar/>
                      </div>
                      <div className='calification'> 
                        Muy malo
                      </div>
                      <Row>
                        <Col lg='6'>{review.description}</Col>
                        <Col lg='2'></Col>
                        <Col lg='4'>{review.updatedAt}</Col>
                      </Row>
                    </div>
                  ) :
                  review.qualification==='2' ? (
                    <div>
                    <hr/>
                        <div className='bsStars'>
                          <BsStarFill/>
                          <BsStarFill/>
                          <BsStar/>
                          <BsStar/>
                          <BsStar/>
                        </div>
                        <div className='calification'>
                          Malo
                        </div>
                        <Row>
                          <Col lg='6'>{review.description}</Col>
                          <Col lg='2'></Col>
                          <Col lg='4'>{review.updatedAt}</Col>
                        </Row>
                      </div>
                    ) : 
                      review.qualification==='3' ? (
                        <div>
                          <div className='bsStars'>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStarFill/>
                            <BsStar/>
                            <BsStar/>
                          </div>
                          <div className='calification'>
                            Promedio
                          </div>
                          <Row>
                            <Col lg='6'>{review.description}</Col>
                            <Col lg='2'></Col>
                            <Col lg='4'>{review.updatedAt}</Col>
                          </Row>
                        </div>
                      ) : 
                        review.qualification==='4' ? (
                          <div>
                            <div className='bsStars'>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStarFill/>
                              <BsStar/>
                            </div>
                            <div className='calification'>
                              Bueno
                            </div> 
                            <Row>
                              <Col lg='6'>{review.description}</Col>
                              <Col lg='2'></Col>
                              <Col lg='4'>{review.updatedAt}</Col>
                            </Row>
                          </div>
                        ) : 
                          (
                            <div>
                              <div className='bsStars'>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStarFill/>
                              </div>
                              <div className='calification'>
                                Excelente
                              </div>
                              <Row>
                                <Col lg='6'>{review.description}</Col>
                                <Col lg='2'></Col>
                                <Col lg='4'>{review.updatedAt}</Col>
                              </Row>
                            </div>
                          ) 
                )
              })
            }
          </div>
        </Col>
      </Row>
    </Container>
      </Row>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {
    reviews: state.reviewsReducer.reviews.rows,
    oneStarReviews: state.reviewsReducer.oneStarReviews,
    twoStarsReviews: state.reviewsReducer.twoStarsReviews,
    threeStarsReviews: state.reviewsReducer.threeStarsReviews,
    fourStarsReviews: state.reviewsReducer.fourStarsReviews,
    fiveStarsReviews: state.reviewsReducer.fiveStarsReviews
  }
}


export default connect(mapStateToProps, null)(Review);