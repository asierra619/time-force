import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName ,email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

export const SAVE_TO_CART = gql`
mutation saveToCart($foodName: String!) {
    saveToCart(foodName: $foodName) {
      _id
      firstName
      lastName
      cart {
        food
      }
    }
}
`;

export const DELETE_FROM_CART = gql`
mutation deleteFromCart($foodName: String!) {
    deleteFromCart(foodName: $foodName) {
        _id
        firstName
        lastName
        cart {
          food
        }
    }
}
`;

export const SAVE_TO_WISHLIST = gql`
mutation saveToWishlish($foodName: String!) {
    saveToWishlish(foodName: $foodName) {
        _id
        firstName
        lastName
        wishlist {
            food
        }
    }
}
`;

export const DELETE_FROM_WISHLIST = gql`
mutation saveToWishlish($foodName: String!) {
    saveToWishlish(foodName: $foodName) {
        _id
        firstName
        lastName
        wishlist {
            food
        }
    }
}
`
