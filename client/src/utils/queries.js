import { gql } from '@apollo/client';

//export queries
export const QUERY_ME = gql`
query me {
  me {
    _id
    firstName
    lastName
    email
    cart {
      foodName
      price
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

export const QUERY_ALL_PIZZA =gql`
query allPizza {
  allPizza {
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

export const QUERY_ALL_SIDEORDERS =gql`
query allSideOrder {
  allSideOrder {
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

export const QUERY_ALL_BEVERAGE =gql`
query allBeverage {
  allBeverage {
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