import React, { useState } from 'react';
import { Form, Field } from "react-final-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import FormInput from "./RegInput";
import PageWrapper from "../../components/PageWrapper";
import isSpaced from "./utils/checkSpace";
import isRequired from "./utils/isRequired";
import validateEmail from "./utils/validateEmail";
import composeValidators from "./utils/composeValidators";

import './index.scss';

const EventRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { eventId } = useParams();

  const signUp = (values, form) => {
    axios.post("http://localhost:5000/events/addUserToEvent", {...values, eventId})
      .then((res) => {
        if (res.data.status === 400) {
          toast.error(res.data.massage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          return;
        }

        toast.success(res.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsRegistered(true);
      })
      .catch(err => console.log(err))
  }

  return (
    <PageWrapper paragraph="Event registration">
      <ToastContainer />
      {isRegistered ? <Link to="/">Back to events</Link> :
        <Form
          onSubmit={signUp}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="reg-form">
              <FormInput name="fullName" type="text" text="Full name" validators={composeValidators(isRequired, isSpaced)}/>
              <FormInput name="email" type="text" text="Email" validators={composeValidators(isRequired, validateEmail)}/>
              <FormInput name="birthDate" type="date" text="Date of birth" validators={isRequired}/>
              <div>
                <label>Where did you hear about this event?</label>
                <div>
                  <label>
                    <Field
                      name="hearFrom"
                      component="input"
                      type="radio"
                      value="social_media"
                      validate={isRequired}
                    />{' '}
                    Social media
                  </label>
                  <label>
                    <Field
                      name="hearFrom"
                      component="input"
                      type="radio"
                      value="friends"
                      validate={isRequired}
                    />{' '}
                    Friends
                  </label>
                  <label>
                    <Field
                      name="hearFrom"
                      component="input"
                      type="radio"
                      value="found_myself"
                      validate={isRequired}
                    />{' '}
                    Found myself
                  </label>
                </div>
              </div>
              <button>Sign up</button>
            </form>
          )}
        />
      }
    </PageWrapper>
  );
};

export default EventRegistration;