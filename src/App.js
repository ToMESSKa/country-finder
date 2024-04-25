import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS } from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";
import { Grid, Row, Col } from "rsuite";
import ContinentSearch from "./ContinentSearch";
import CurrencySearch from "./CurrencySearch";
import Pagination from "./Pagination";

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
  const [countries, setCountries] = useState([]);
  const [currentCountries, setCurrentCountries] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  const [searchVariables, setSearchVariables] = useState();

  const [
    continentAndCurrencySearchDisabled,
    setContinentAndCurrencySearchDisabled,
  ] = useState(true);

  const [countryCodeSearchDisabled, setCountryCodeSearchDisabled] =
    useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPge, SetPostsPerPage] = useState(10);

  // const indexOfLastCountry = currentPage * countriesPerPge;
  // const indexOfFirstCountry = indexOfLastCountry - countriesPerPge;

  const handlePagination = () => {
    let indexOfLastCountry = currentPage * countriesPerPge;
    let indexOfFirstCountry = indexOfLastCountry - countriesPerPge;
    let currentCountries = data.countries.slice(
      indexOfFirstCountry,
      indexOfLastCountry
    );
    setCountries(data.countries)
    setCurrentCountries(currentCountries)
    createPageNumbers()
  };

  const handlePag = () => {
    console.log(countries)
    let indexOfLastCountry = currentPage * countriesPerPge;
    let indexOfFirstCountry = indexOfLastCountry - countriesPerPge;
    let currentCountries = countries.slice(
      indexOfFirstCountry,
      indexOfLastCountry
    );
    console.log(currentCountries)
    setCurrentCountries(currentCountries)

  };

  const createPageNumbers = () => {
    console.log(data.countries)
    let pageNumbersArray = []
    let mayPageNumbers = data.countries.length / countriesPerPge
    for (let i = 1; i < mayPageNumbers +1; i++) {
      pageNumbersArray.push(i)
    } 
    setPageNumbers(pageNumbersArray)

  };



  const [executeSearch, { data }] = useLazyQuery(GET_COUNTRIES, {
    variables: searchVariables,
    onCompleted: handlePagination,
  });

  

  const handleSearchForContinentAndCurrency = () => {
    console.log("hell")
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

 

  return (
    <>
      <header>
        <h1 className="countries-list">Country Finder</h1>
      </header>
      <div>
        Select search type
        <RadioGroup
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
            handleSearchForContinentAndCurrency={
              handleSearchForContinentAndCurrency
            }
          ></CountryCodeSearch>
        </Row>
      </Col>
      <button onClick={(e) => handlePagination()}>SEE</button>
      <Table data={currentCountries}></Table>
      <Pagination handlePag ={handlePag} pageNumbers={pageNumbers} setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>
    </>
  );
};

export default App;
