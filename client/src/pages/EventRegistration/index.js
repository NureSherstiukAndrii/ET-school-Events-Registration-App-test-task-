import React, { useState } from 'react';
import { Form } from "react-final-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import FormInput from "./RegInput";
import FormCheckBox from "./FormCheckBox";
import PageWrapper from "../../components/PageWrapper";
import isSpaced from "./utils/checkSpace";
import isRequired from "./utils/isRequired";
import validateEmail from "./utils/validateEmail";
import isFullName from "./utils/checkFullName";
import composeValidators from "./utils/composeValidators";
import { toastSuccess, toastError } from "./utils/toasts";
import BackToEvents from "../../components/BackToEvents";
import { https } from "../../api/https";

import './index.scss';

const EventRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { eventId } = useParams();

  const signUp = (values) => {
    if (Object.keys(values).length < 4) {
      toastError("Fill in all the fields");

      return;
    }

    axios.post(`${https}/addUserToEvent`, {...values, eventId})
      .then((res) => {
        if (res.data.status === 400) {
          toastError(res.data.message);

          return;
        }

        toastSuccess(res.data);
        setIsRegistered(true);
      })
      .catch(err => console.log(err))
  };

  return (
    <PageWrapper paragraph="Event registration">
      <ToastContainer />
      {isRegistered ? <BackToEvents /> :
        <Form
          onSubmit={signUp}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="reg-form">
              <FormInput
                name="fullName"
                type="text"
                text="Full name"
                validators={composeValidators(isRequired, isSpaced, isFullName)}
              />
              <FormInput
                name="email"
                type="text"
                text="Email"
                validators={composeValidators(isRequired, validateEmail)}
              />
              <FormInput
                name="birthDate"
                type="date"
                text="Date of birth"
                validators={isRequired}
              />
              <div className="reg-form-labels-container">
                <label>Where did you hear about this event?</label>
                <div className="labels">
                  <FormCheckBox value="social_media" text="Social media" />
                  <FormCheckBox value="friends" text="Friends" />
                  <FormCheckBox value="found_myself" text="Found myself" />
                </div>
              </div>
              <button className="reg-form-btn">Sign up</button>
              <BackToEvents />
            </form>
          )}
        />
      }
    </PageWrapper>
  );
};

export default EventRegistration;