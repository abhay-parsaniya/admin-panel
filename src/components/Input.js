import React from "react";

const Input = ( props ) => {

  return (
    <>
      <input
        type={props.type}
        className={props.className}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
    </>
  );
};

Input.defaultProps = {
  type: 'text',
  className: 'form-control',
  placeholder: ''
}

export default Input;
