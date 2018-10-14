import React from "react";
import classnames from "classnames";

const TextInputGroup = ({ label, name, value, type, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classnames("form-control", {
          "is-invalid": error
        })}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextInputGroup;
