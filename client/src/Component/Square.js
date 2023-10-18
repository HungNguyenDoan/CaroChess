import React from 'react';
import "./css/style.css"
const Square = (props) => {
  return (
    <div className="square" onClick={props.onClick}>
      {props.value}
    </div>
  );
};

export default Square;