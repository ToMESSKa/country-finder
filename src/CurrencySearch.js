import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";

import { useQuery, useLazyQuery } from "@apollo/client";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const CurrencySearch = (props) => {

  const [currency, setCurrency] = useState("");

  useEffect(() => {
      props.handleSearchForContinentAndCurrency()
  }, [props.currency]);


  return (
    <Formik
      initialValues={{ currency: "" }}
      handleChange={(values) => console.log(values)}
    >
      {(formikProps) => {
        const { values, handleChange } = formikProps;
        return (
          <Form>
            <Field
              disabled={props.continentAndCurrencySearchDisabled} 
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
