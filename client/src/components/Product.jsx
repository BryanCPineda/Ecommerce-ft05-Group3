import React from "react";
import { useState,useEffect } from "react";
import axios from "axios"
import data from "../data"
import {Card, Button} from "react-bootstrap"




export default function Product(props){
//    console.log(props)
   let mapeo = data.products.filter(ele => ele.id == props.match.params.id )
  
  

  const [product,setProduct]=useState({});
  
  function mostrarProducto(prod){
  axios.get("http://localhost:4000/products/" + mapeo[0].id)
  .then(res=>
    res.data
  )
  .then(res=>
    setProduct(res)
  )

  }
  
  
  mostrarProducto()
    
  
  return( 
     <div className="text">
      
      <Card className="text-center">
        
      <Card.Body>
    <Card.Title>{product.name}</Card.Title>
      <Card.Text>
      {product.description}.
       </Card.Text>
       <Button variant="primary">Buy</Button>
       </Card.Body>
       <Card.Footer className="text">Stock:{product.stock}</Card.Footer>
       <Card.Footer className="text">Price:{product.price}</Card.Footer>
      </Card>
     </div>
  )
}