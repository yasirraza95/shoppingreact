import React from "react";

function Button(props) {
  return (
    <button
      type={props.type || "button"}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </button>
  );
}

export default Button;
