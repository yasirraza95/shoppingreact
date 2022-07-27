import React from "react";

function Input(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        className={props.className}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        tabIndex={props.tabIndex}
      />
      {props.children}
    </>
  );
}

export default Input;
