import { gql } from '@apollo/client';

//export queries
export const QUERY_ME = gql`
query me {
  me {
    _id
    firstName
    lastName
    email
    createdAt
    cart {
      food
    }
    wishlist{
      food
    }
  }
}
`;

export const QUERY_ALL_USERS =gql`
query allUsers {
  allUsers {
    _id
    firstName
    lastName
    email
  }
}`;