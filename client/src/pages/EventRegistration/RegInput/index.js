import React from 'react';
import { Field } from "react-final-form";

import "./index.scss";

const FormInput = ({
     name, validators, type, text
   }) => (
  <Field name={name} validate={validators}>
    {({ input, meta }) => (
      <div className="input-container">
        <span>{text}</span>
        <input
          {...input}
          name={name}
          type={type}
        />

        {meta.error && meta.touched && <span className="error-massage">{meta.error}</span>}
      </div>
    )}
  </Field>
);

export default FormInput;