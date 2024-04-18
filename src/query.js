import { gql } from "@apollo/client";

const GET_COUNTRIES = gql`
  query getCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      capital
      currency
      continent {
        code
        name
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      name
      code
      countries {
        code
        name
        capital
        currency
      }
    }
  }
`;

export { GET_COUNTRIES, GET_CONTINENTS };
