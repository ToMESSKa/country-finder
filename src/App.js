import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import { GET_COUNTRIES } from "./query";

import {
  useMutation,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const App = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES, {variables: 
    {
      filter: {
        currency: {
          eq: "USD"
        }
      }
    }
  
  })

  const finddata = () => {
    console.log(data);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  return (
    <>
      <header>
        <h1 className="countries-list">Country Finder</h1>
      </header>
      <div className="row">
        <Table data={data}></Table>
        <button onClick={finddata}></button>
      </div>
    </>
  );
};

export default App;
