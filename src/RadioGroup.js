import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";

import { useQuery, useLazyQuery } from "@apollo/client";

const RadioGroup = (props) => {

  
  const radioHandler = (value) => {
    if (value === "continent-currency") {
      props.setContinentAndCurrencySearchDisabled(false);
    }else if (value === "continent-currency"){
      props.setContinentAndCurrencySearchDisabled(false);
    }
  };

  return (
    <Formik
      initialValues={{
        picked: "",
      }}
    >
      <Form>
        <div
          onChange={(event) => {
            radioHandler(event.target.value);
          }}
          role="group"
          aria-labelledby="my-radio-group"
        >
          <label>
            <Field type="radio" name="picked" value="continent-currency" />
            Search by continent and currency
          </label>
          <br />
          <label>
            <Field type="radio" name="picked" value="country-code" />
            Search by country code
          </label>
        </div>
      </Form>
    </Formik>
  );
};

export default RadioGroup;
