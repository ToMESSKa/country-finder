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
import { eventWrapper } from "@testing-library/user-event/dist/utils";

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

  const handleSearchForCurrency = (value) => {
    setSearchFilter(value);
    executeSearch({
      variables: { eq: searchFilter },
    })
  };

  return (
    <>
      <header>
        <h1 className="countries-list">Country Finder</h1>
      </header>
      <div>
        Search
        <input type="text" onChange={(e) => handleSearch(e.target.value)} />
        {/* <button
          onClick={() =>
            executeSearch({
              variables: { eq: searchFilter },
            })
          }
        >
          OK
        </button> */}
      </div>
      <Table data={data}></Table>
    </>
  );
};

export default App;
