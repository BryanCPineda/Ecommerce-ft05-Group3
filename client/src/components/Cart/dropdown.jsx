import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./dropD.css";

class DropD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: this.props.quantity,
    };
  }

  changeValue(text) {
    this.setState({ dropDownValue: text });
  }

  render() {
    return (
      <div>
        <header></header>
        <div>
          <DropdownButton
            id="dropdown-item-button"
            title={this.state.dropDownValue}
            className="format"
          >
            <Dropdown.Item as="button">
              <div onClick={(e) => this.changeValue(e.target.textContent)}>
                1
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={(e) => this.changeValue(e.target.textContent)}>
                2
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={(e) => this.changeValue(e.target.textContent)}>
                3
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={(e) => this.changeValue(e.target.textContent)}>
                4
              </div>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <div onClick={(e) => this.changeValue(e.target.textContent)}>
                5
              </div>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default DropD;
