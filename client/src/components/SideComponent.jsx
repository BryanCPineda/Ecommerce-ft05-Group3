import React from "react";
import "./SideComponent.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import {FiChevronRight} from 'react-icons/fi'
import { Form , Button} from 'react-bootstrap';

function SideComponent({
  categories,
  productsFromCategories,
  orderByLowerPrice,
  orderByHighPrice,
}) {

  return (
    <div className="sideComponent">
      <h2 className="d-flex justify-content-center mt-5 categories p-4">
        Categories
      </h2>
      <div className='all-content'><span >All Products</span><Button variant="outline-light" style={{padding: '1px'}}  
          className='button-side' onClick={()=> productsFromCategories("todos los productos")}><FiChevronRight /> </Button>
      </div>
      <div className='side-content'>
          
          {categories && categories.map((element, index) => (
                <Form key={index} value={categories} onChange={productsFromCategories}>
                  <div  class="btn-group-vertical" className="d-flex justify-content-between mt-4">
                    {/*<Form.Label className="label-side-bar ml-3">{element.name}</Form.Label>*/}
                    <span>{element.name}</span><Button variant="outline-light" className='button-side' style={{padding: '1px'}}  
                    onClick={()=>productsFromCategories(element.name)}><FiChevronRight /> </Button>
                    {/*<input className="input-sidebar mr-2" value={element.name} type="checkbox"></input>*/}
                  </div>
                </Form>
              ))}
      </div>
      <div className="mt-5">
        <h5 className="d-flex justify-content-center title-price">
          Order by Price
        </h5>
        <div>
          <div className="d-flex justify-content-center">
            <label className="mr-3 mb-3">Highest</label>
            <button
              className="ml-3 d-flex align-self-center mb-3 highest"
              type="checkbox"
              onClick={orderByHighPrice}
            >
              <AiOutlineArrowUp />
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <label className="mr-3 p-1">Lowest</label>
            <button
              className="ml-3 d-flex align-self-center mb-1 lowest"
              type="checkbox"
              onClick={orderByLowerPrice}
            >
              <AiOutlineArrowDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideComponent

