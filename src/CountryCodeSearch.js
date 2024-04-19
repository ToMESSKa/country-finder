import "./App.css";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";

const CountryCodeSearch = (props) => {

  useEffect(() => {
    props.handleSearchForContinentAndCurrency()
}, [props.countryCode]);

  return (
    <Formik
      initialValues={{countrycode: ""}}
    >
      {(formikProps) => {
        const { values, handleChange } = formikProps;
        return (
          <Form>
            <Field className="country-code-form"
              placeholder="Country code"
              as="input"
              value={props.countryCode}
              disabled={props.countryCodeSearchDisabled} 
              onChange={(e) => {
                props.setCountryCode(e.target.value)
                handleChange(e);
              }}
              name="countrycode"
            ></Field>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CountryCodeSearch;
