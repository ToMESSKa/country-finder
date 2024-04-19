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
  const [countryCode, setCountryCode] = useState();
  const [currencyValue, setCurrencyValue] = useState();

  const [searchVariables, setSearchVariables] = useState();

  const [
    continentAndCurrencySearchDisabled,
    setContinentAndCurrencySearchDisabled,
  ] = useState(true);

  const [countryCodeSearchDisabled, setCountryCodeSearchDisabled] =
    useState(false);

  const [executeSearch, { data }] = useLazyQuery(GET_COUNTRIES, {
    variables: searchVariables,
  });

  const handleSearchForContinentAndCurrency = () => {
    if (countryCode) {
      setSearchVariables({
        filter: { code: { eq: countryCode } },
      });
    } else if (continent) {
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

  const handleSearchForCountryCode = () => {
    setSearchVariables({
      filter: { code: { eq: countryCode } },
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
        setCurrencyValue={setCurrencyValue}
          setContinent={setContinent}
          setCurrency={setCurrency}
          setCountryCode={setCountryCode}
          setContinentAndCurrencySearchDisabled={
            setContinentAndCurrencySearchDisabled
          }
          setCountryCodeSearchDisabled={setCountryCodeSearchDisabled}
        ></RadioGroup>
      </div>
      <Col>
        <Row className="search-form-container">
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
        <Row className="search-form-container">
          <CountryCodeSearch
            className="country-code-form"
            countryCodeSearchDisabled={countryCodeSearchDisabled}
            setCountryCode={setCountryCode}
            countryCode={countryCode}
            handleSearchForContinentAndCurrency={handleSearchForContinentAndCurrency}
          ></CountryCodeSearch>
        </Row>
      </Col>
      <Table data={data}></Table>
    </>
  );
};

export default App;
