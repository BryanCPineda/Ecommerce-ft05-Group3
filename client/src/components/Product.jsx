import React from "react";
import { useState,useEffect } from "react";
import axios from "axios"
import data from "../data"
import "../components/Product.css";


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
         <div>
{/*             
        //     <div className="Name">
        //      <h1>{mapeo.name}</h1>
        //      {console.log(mapeo.name)}
        //      </div>
        //      <div className="Propiedades">
        //      <h5>{mapeo[0].description}</h5>
        //      <h7>{mapeo[0].price}</h7> 
        //      <h7>{mapeo[0].stock}</h7> 
        //      </div> */}

          <h1>{product.image}</h1>
            
         </div>
    )
}