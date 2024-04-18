import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";

import { useQuery, useLazyQuery } from "@apollo/client";

const ContinentSearch = (props) => {
  const { data: continents } = useQuery(GET_CONTINENTS);

  useEffect(() => {
    props.handleSearchForContinentAndCurrency();
  }, [props.continent]);


  return (
    <Formik initialValues={{ continent: "Continent" }}>
      {(formikProps) => {
        const { values } = formikProps;
        return (
          <Form>
            <Field
              as="select"
              name="continent"
              disabled={props.continentAndCurrencySearchDisabled}
            >
              <option selected>Continent</option>
              {continents &&
                continents.continents.map((continent) => (
                  <option
                    onClick={() => {
                      props.setContinent(values.continent);
                    }}
                    value={continent.code}
                  >
                    {continent.name}
                  </option>
                ))}
            </Field>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContinentSearch;
