import React from 'react';
import { Field } from "react-final-form";

const FormCheckBox = ({ value, text}) => (
  <label>
    <Field
      name="hearFrom"
      component="input"
      type="radio"
      value={value}
    />{' '}
    {text}
  </label>
);

export default FormCheckBox;