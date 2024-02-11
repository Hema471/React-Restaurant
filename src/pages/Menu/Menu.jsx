import React, { useState } from "react";
import "./Menu.scss";
import menuData from "../../Menu";
import Card from "../../components/Card/Card";

function Menu() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setOutput(inputValue);
  };

  return (
    <div className="menu-page">
      <header className="mt-5 my-menu-header ">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <h1 className="text-light">Menu</h1>
        </div>
      </header>
      <div className="my-menu-page">
      <div className="menu-container ">
        <div className="menu-input">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add New Comment"
            className="menu-input-field"
          />
          <button onClick={handleButtonClick} className="menu-button">
            Submit
          </button>
        </div>
        <div className="menu-output">Output: {output}</div>
        <div className="menu-items">
          {menuData.map((meal) => (
            <div key={meal.id} className="menu-item">
              <Card title={meal.title} price={meal.price} img={meal.img} />
            </div>
          ))}
        </div>
      </div>
    </div></div>
  );
}

export default Menu;
