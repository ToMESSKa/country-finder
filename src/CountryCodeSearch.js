import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";

import { useQuery, useLazyQuery } from "@apollo/client";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const CountryCodeSearch = (props) => {


  return (
    <Formik
      initialValues={{countrycode: ""}}
    >
      {(formikProps) => {
        const { values, handleChange } = formikProps;
        return (
          <Form>
            <Field
              as="input"
              onChange={(e) => {
                console.log(e.target.value)
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
