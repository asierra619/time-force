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
      food {
        foodName
      }
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

export const QUERY_ALL_FOOD =gql`
query allFood {
  allFood {
    _id
    foodName
    description
    image
    price
    quantity
    category {
      _id
      categoryName
    }
  }
}`