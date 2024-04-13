import "./App.css";
import { Grid, Row, Col } from "rsuite";
import { GET_COUNTRIES } from "./query";

import {
  useMutation,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useLazyQuery,
} from "@apollo/client";

const Table = (props) => {


  return (
    <div className="table">
      
      <Grid>
            <Row className="row">
            <Col className="column">Code</Col>
            <Col className="column">Country</Col>
            <Col className="column">Capital</Col>
            <Col className="column">Currency</Col>
            </Row>
          {props.data &&
        props.data.countries && props.data.countries.map((country) => (
            <Row className="row">
            <Col className="column">{country.code}</Col>
            <Col className="column">{country.name}</Col>
            <Col className="column">{country.capital}</Col>
            <Col className="column">{country.currency}</Col>
            </Row>
          ))}
      </Grid>
    </div>
  );
};

export default Table;
