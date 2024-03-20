import { gql } from '@apollo/client';

//export mutations

export const CREATE_USER = gql`
mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName ,email: $email, password: $password) {
      token
      user {
        _id
        username
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
        username
      }
    }
  }
`;

export const SAVE_TO_CART = gql`
mutation saveToCart(args) {
    saveToCart(args) {
      _id
      firstName
      lastName
      cart
    }
}
`;

export const DELETE_FROM_CART = gql`
mutation deleteFromCart($foodName: String!) {
    deleteFromCart(foodName: $foodName) {
        _id
        firstName
        lastName
        cart
    }
}
`;

export const SAVE_TO_WISHLIST = gql`
mutation saveToWishlish(args) {
    saveToWishlish(args) {
        _id
        firstName
        lastName
        wishlist
    }
}
`;

export const DELETE_FROM_WISHLIST = gql`
mutation saveToWishlish($foodName: String!) {
    saveToWishlish(foodName: $foodName) {
        _id
        firstName
        lastName
        wishlist
    }
}
`;