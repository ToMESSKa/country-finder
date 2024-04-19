import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col, Button } from "rsuite";

import { useQuery, useLazyQuery } from "@apollo/client";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const CurrencySearch = (props) => {

  const [placeholder, setPlaceholder] = useState();

  useEffect(() => {
      props.handleSearchForContinentAndCurrency()
  }, [props.currency]);

  const resetInput = () => {
      setPlaceholder("")
  };


  return (
    <Formik
      initialValues={{ currency: props.currency }}
    >
      {(formikProps) => {
        const { values, handleChange, resetForm } = formikProps;
        return (
          <Form>
            <Field
              disabled={props.continentAndCurrencySearchDisabled} 
              value={props.currency}
              placeholder="Currency"
              as="input"
              onChange={(e) => {
                props.setCurrency(e.target.value)
                handleChange(e);
              }}
              name="currency"
            ></Field>
          </Form>
        );
      }}
      
    </Formik>
  );
};

export default CurrencySearch;
