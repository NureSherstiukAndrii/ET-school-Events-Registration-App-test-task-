import React from 'react';
import { Field } from "react-final-form";

import "./index.scss";

const FormInput = ({ name, validators, type, text }) => (
  <Field name={name} validate={validators}>
    {({ input, meta }) => (
      <div className={`input-container ${meta.error && meta.touched ? "error" : ""}`}>
        <span className="input-container-name">{text}</span>
        <input
          {...input}
          name={name}
          type={type}
          className="input-container-field"
        />

        {meta.error && meta.touched && <span className="error-massage">{meta.error}</span>}
      </div>
    )}
  </Field>
);

export default FormInput;