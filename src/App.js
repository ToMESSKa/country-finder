import logo from "./logo.svg";
import "./App.css";

import { GET_COUNTRIES } from "./query";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const App = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { page: 3 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <>
      <header>
        <h1 className="countries-list">Countries</h1>
      </header>
      <div className="row">
        {data.countries.map(country => <div>{country.capital}</div>)}
      </div>
    </>
  );
};

export default App;
