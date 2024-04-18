import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";
import ContinentSearch from "./ContinentSearch";
import CurrencySearch from "./CurrencySearch";

import {
  useMutation,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
} from "@apollo/client";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import RadioGroup from "./RadioGroup";
import CountryCodeSearch from "./CountryCodeSearch";

const App = () => {
  const [continent, setContinent] = useState(false);
  const [currency, setCurrency] = useState();

  const [searchVariables, setSearchVariables] = useState();

  const [
    continentAndCurrencySearchDisabled,
    setContinentAndCurrencySearchDisabled,
  ] = useState(true);

  const [executeSearch, { data }] = useLazyQuery(GET_COUNTRIES, {
    variables: searchVariables,
  });

  const handleSearchForContinentAndCurrency = () => {
    if (continent) {
      setSearchVariables({
        filter: { continent: { eq: continent }, currency: { eq: currency } },
      });
    } else {
      setSearchVariables({ filter: { currency: { eq: currency } } });
    }
    executeSearch({
      searchVariables,
    });
  };

  return (
    <>
      <header>
        <h1 className="countries-list">Country Finder</h1>
      </header>
      <div>
        Select search type
        <RadioGroup
          setContinentAndCurrencySearchDisabled={
            setContinentAndCurrencySearchDisabled
          }
        ></RadioGroup>
      </div>
      <Row className="row">
        <ContinentSearch
          continent={continent}
          setContinent={setContinent}
          continentAndCurrencySearchDisabled={
            continentAndCurrencySearchDisabled
          }
          handleSearchForContinentAndCurrency={
            handleSearchForContinentAndCurrency
          }
        ></ContinentSearch>
        <CurrencySearch
          continentAndCurrencySearchDisabled={
            continentAndCurrencySearchDisabled
          }
          currency={currency}
          setCurrency={setCurrency}
          handleSearchForContinentAndCurrency={
            handleSearchForContinentAndCurrency
          }
        ></CurrencySearch>
      </Row>
      <Row>
        <Col>
          <CountryCodeSearch></CountryCodeSearch>
        </Col>
      </Row>
      <Table data={data}></Table>
    </>
  );
};

export default App;
