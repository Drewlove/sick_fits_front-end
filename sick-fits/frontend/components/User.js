import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

// exporting the query here, as opposed to adding an export
// where the query is declared, allows the query import to be
// autocompletd when importing from other components
export { CURRENT_USER_QUERY };
