import React from 'react';
import './Reviews.css';
import { connect } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import {oneStar, towStars, threeStars, fourStars, fiveStars} from './stars';
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';

function Review({reviews, oneStarReviews, twoStarsReviews, threeStarsReviews, fourStarsReviews, fiveStarsReviews}) {
// var promedio = Math.floor(Math.random()*(5*10-1*10)+1*10)/(1*10); 

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
  let myReviews = reviews.rows;
  console.log('myReviews', myReviews)
  const myObjs = []
  
  const createMyObj = () =>{
    for (let i = 0; i < myReviews.length; i++) {
      myObjs.push({
        name: myReviews[i].user.name,
        lastname: myReviews[i].user.lastname,
        qualification: myReviews[i].qualification,
        description: myReviews[i].description,
        date: myReviews[i].updatedAt
      })
    }
    return myObjs;
  }
  createMyObj();
  console.log('myObjs', myObjs)

  return (
    <Container style={{paddingBottom: '30px'}}>
      <br/>
      <Row className="justify-content-md-center" >
        <Col lg="7">
          <div>
            <h1>Opiniones sobre el producto</h1>
          </div>
        </Col>
      </Row>
      <hr style={{borderStyle: 'dashed',
                                  borderWidth: 1,
                                  borderRadius: 1,
                                  color: '#8a2be2' 
                                }}/>
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
                    {oneStar}
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
                        {towStars}
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
                          {threeStars}
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
                                {fourStars}
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
                                  {fiveStars}
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
      <hr style={{borderStyle: 'dashed',
                  borderWidth: 1,
                  borderRadius: 1,
                  color: '#8a2be2' 
                }} />
      <Row>
        <Col>
          {
            myObjs && myObjs.map((obj, index)=>{
              return (
                obj.qualification==='1' ? (
                  <div key={index} >
                    <Row className='bsStars'>
                      <Col>
                        {oneStar}
                      </Col>
                    </Row>
                    <Row className='calification'> 
                      <Col>Muy malo</Col>
                    </Row>
                    <Row>
                      <Col lg='6'>{obj.description}</Col>
                      <Col lg='2'></Col>
                      <Col lg='4'>{obj.date}</Col>
                    </Row>
                    <Row>
                      <Col lg='3'><b>{obj.name} {obj.lastname}</b></Col>
                      <Col lg='9'></Col>
                    </Row>
                    <hr/>
                  </div>
                ) :
                  obj.qualification==='2' ? (
                    <div key={index}>
                      <Row className='bsStars'>
                        <Col>
                          {towStars}
                        </Col>
                      </Row>
                      <Row className='calification'>
                        <Col>Malo</Col>
                      </Row>
                      <Row>
                        <Col lg='6'>{obj.description}</Col>
                        <Col lg='2'></Col>
                        <Col lg='4'>{obj.date}</Col>
                      </Row>
                      <Row>
                        <Col lg='3'><b>{obj.name} {obj.lastname}</b></Col>
                        <Col lg='9'></Col>
                      </Row>
                      <hr/>
                    </div>
                  ) : 
                    obj.qualification==='3' ? (
                      <div key={index}>
                        <Row className='bsStars'>
                          <Col>
                            {threeStars}
                          </Col>
                        </Row>
                        <Row className='calification'>
                          <Col>
                            Promedio
                          </Col>
                        </Row>
                        <Row>
                          <Col lg='6'>{obj.description}</Col>
                          <Col lg='2'></Col>
                          <Col lg='4'>{obj.date}</Col>
                        </Row>
                        <Row>
                          <Col lg='3'><b>{obj.name} {obj.lastname}</b></Col>
                          <Col lg='9'></Col>
                        </Row>
                        <hr/>
                      </div>
                    ) : 
                      obj.qualification==='4' ? (
                        <div key={index}>
                          <Row className='bsStars'>
                            <Col>
                              {fourStars}
                            </Col>
                          </Row>
                          <Row className='calification'>
                            <Col>
                              Bueno
                            </Col>
                          </Row> 
                          <Row>
                            <Col lg='6'>{obj.description}</Col>
                            <Col lg='2'></Col>
                            <Col lg='4'>{obj.date}</Col>
                          </Row>
                          <Row>
                            <Col lg='3'><b>{obj.name} {obj.lastname}</b></Col>
                            <Col lg='9'></Col>
                          </Row>
                          <hr/>
                        </div>
                      ) : 
                        (
                          <div key={index}>
                            <Row className='bsStars'>
                              <Col>
                                {fiveStars}
                              </Col>
                            </Row>
                            <Row className='calification'>
                              <Col>
                                Excelente
                              </Col>
                            </Row>
                            <Row>
                              <Col lg='6'>{obj.description}</Col>
                              <Col lg='2'></Col>
                              <Col lg='4'>{obj.date}</Col>
                            </Row>
                            <Row>
                              <Col lg='3'><b>{obj.name} {obj.lastname}</b></Col>
                              <Col lg='9'></Col>
                            </Row>
                            <hr/>
                          </div>
                        ) 
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = (state)=>{
  return {
    reviews: state.reviewsReducer.myReviews,
    oneStarReviews: state.reviewsReducer.oneStarReviews,
    twoStarsReviews: state.reviewsReducer.twoStarsReviews,
    threeStarsReviews: state.reviewsReducer.threeStarsReviews,
    fourStarsReviews: state.reviewsReducer.fourStarsReviews,
    fiveStarsReviews: state.reviewsReducer.fiveStarsReviews
  }
}


export default connect(mapStateToProps, null)(Review);