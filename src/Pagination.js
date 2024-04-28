import "./App.css";
import { Grid, Row, Col, TagPicker } from "rsuite";
import { GET_COUNTRIES } from "./query";
import React, { useState, useEffect } from "react";

import {
  useMutation,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
} from "@apollo/client";

const Pagination = (props) => {

  useEffect(() => {
    props.createCurrentCountries(props.countries);
  }, [props.currentPage]);


  return (
    <div className="pagination">
          {props.pageNumbers.map((page) => (
            <div value={page} onClick={(e) => {
              props.setCurrentPage(e.target.innerText);
            }} className="page"><a>{ page }</a></div>
          ))}
    </div>
  );
};

export default Pagination;
