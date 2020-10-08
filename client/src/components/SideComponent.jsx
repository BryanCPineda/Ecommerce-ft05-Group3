import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Form } from 'react-bootstrap';
import './SideComponent.css';

function SideComponent({data}) {
    console.log(data)
    return (
      <div className="sideComponent">
        <h2 className="d-flex justify-content-center mt-5 categories p-4">
          Categories
        </h2>
        {data.products.map((element) => (
          <Form key={element.id}>
            <div className="d-flex justify-content-between mt-4">
              <Form.Label className="ml-4">{element.category}</Form.Label>
              <button className="mr-4 button-select">
                <MdKeyboardArrowRight />
              </button>
            </div>
          </Form>
        ))}
        <div className="mt-5">
          <h5 className="d-flex justify-content-center title-price">
            Order by Price
          </h5>
          <div>
            <div className="d-flex justify-content-center">
              <label className="mr-3 p-1">Lowest</label>
              <input
                className="ml-3 d-flex align-self-center mb-1"
                type="checkbox"
              ></input>
            </div>

            <div className="d-flex justify-content-center">
              <label className="mr-3 mb-3">Highest</label>
              <input
                className="ml-3 d-flex align-self-center mb-3"
                type="checkbox"
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SideComponent

