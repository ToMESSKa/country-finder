import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";

import { useQuery, useLazyQuery } from "@apollo/client";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const ContinentSearch = (props) => {
  const [searchFilter, setSearchFilter] = useState("");
  const { data: continents } = useQuery(GET_CONTINENTS);

  const [executeSearch, { data }] = useLazyQuery(GET_COUNTRIES, {
    variables: {
      filter: {
        currency: {
          eq: searchFilter,
        },
      },
    },
  });

  const handleSearchForCurrency = (value) => {
    setSearchFilter(value);
    executeSearch({
      variables: { eq: searchFilter },
    });
  };

  return (
    <Formik initialValues={{ continent: "Asia" }}>
      {(formikProps) => {
        const { values } = formikProps;
        return (
          <Form>
              <Field as="select" name="continent" disabled={props.continentAndCurrencySearchDisabled} >
                {continents &&
                  continents.continents.map((continent) => (
                    <option
                      onClick={() => {
                        console.log("selected values", values);
                      }}
                      value={continent.name}
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
