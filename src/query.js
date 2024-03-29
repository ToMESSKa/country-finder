import { gql } from "@apollo/client";

const GET_COUNTRIES = gql`
  query getCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      capital
      currency
    }
  }
`;

export { GET_COUNTRIES };
