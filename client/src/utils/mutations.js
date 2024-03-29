import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
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
  mutation saveToCart($foodName: String!, $price: Float!) {
    saveToCart(foodName: $foodName, price: $price) {
      _id
      firstName
      lastName
      cart {
        foodName
        price
      }
    }
  }
`;

export const DELETE_FROM_CART = gql`
  mutation deleteFromCart($_id: ID!) {
    deleteFromCart(_id: $_id) {
      _id
      firstName
      lastName
      cart {
        _id
        foodName
        price
      }
    }
  }
`;

/*
export const SAVE_TO_WISHLIST = gql`
  mutation saveToWishlish($foodName: String!) {
    saveToWishlish(foodName: $foodName) {
      _id
      firstName
      lastName
      wishlist {
        foodName
        price
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
        foodName
        price
      }
    }
  }
`;
*/