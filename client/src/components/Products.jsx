import React from "react"
import  "../components/Products.css"
import {Card,Button} from "react-bootstrap"



//Creacion del  componente producto
export default function products(){
    const onClick= function(e){
        e.preventDefault();
        alert("Product Added to cart")
    }
    
 return(
    
    <div className="StyleBox">
        
    <Card style={{ width: '18rem' }}>
      <Card.Body>
         <Card.Title className="titulo">
            <h3> Macuerna 20kg </h3>
         </Card.Title>
         <Card.Img className="Pesas" variant="top" src="https://previews.123rf.com/images/kornienko/kornienko1410/kornienko141000011/32919879-pesas-m%C3%A1s-de-fondo-blanco-con-trazado-de-recorte.jpg"/>
         <Card.Text className="Precio">
           <h4>  $1.000 </h4>
        </Card.Text>
        <Card.Text className="Descripción">
           <h5>  Mancuerna de acero inoxidable con pesas de 5kg c/u </h5>
        </Card.Text>
        <Card.Text className="Descripción">
            Stock: disponible
        </Card.Text>
        <Button onClick={onClick}className="Boton" variant="primary">add to cart</Button>
        
      </Card.Body>
   </Card>
      
    </div>
 )
 }

 