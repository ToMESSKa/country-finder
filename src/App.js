import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES } from "./query";
import React, { useState, useEffect } from "react";

import { GET_COUNTRIES_BY_CURRENCY } from "./query";

import { Formik } from "formik";

import SearchForm from "./SearchForm";

import {
  useMutation,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
} from "@apollo/client";

const App = () => {
 
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useLazyQuery(GET_COUNTRIES, {
    variables: {
      filter: {
        currency: {
          eq: searchFilter,
        },
      },
    },
  });

  return (
    <>
      <header>
        <h1 className="countries-list">Country Finder</h1>
      </header>

      <div>
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() =>
            executeSearch({
              variables: { eq: searchFilter },
            })
          }
        >
          OK
        </button>
      </div>
      <Table data={data}></Table>

      {/* <div className="row">
        <SearchForm
          currency={currency}
          setCurrency={setCurrency}
          getCountriesByCurrency={getCountriesByCurrency}
        ></SearchForm>
        
      {/* </div> */}
    </>
  );
};

export default App;
