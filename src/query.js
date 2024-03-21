import { gql } from '@apollo/client'

const GET_COUNTRIES= gql`
query getCountries {
    countries {
      capital
      currency
    }
}`

export { GET_COUNTRIES }