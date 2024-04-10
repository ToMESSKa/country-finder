import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES, GET_CONTINENTS} from "./query";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form } from "formik";

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

  const radioHandler = (value) => {
    console.log(value);
  };

  return (
    <>
      <header>
        <h1 className="countries-list">Country Finder</h1>
      </header>
      <div>
        Select search type
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
                <Field type="radio" name="picked" value="One" />
                Search by continent and currency
              </label>
              <label>
                <Field type="radio" name="picked" value="Two" />
                Search by country code
              </label>
            </div>
          </Form>
        </Formik>
      </div>
      <Formik>
      <Form>
           <Field as="select" name="color">
           {continents && continents.continents.map((continent) => (
             <option value="red">{continent.name}</option>
             ))}
           </Field>
         </Form>
      </Formik>
    
      <Formik>
          <form>
            <input
              type="text"
              onChange={event => handleSearchForCurrency(event.target.value)}
              name="name"
            />
          </form>
          </Formik>
      <Table data={data}></Table>
    </>
  );
};

export default App;
