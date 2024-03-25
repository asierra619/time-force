import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_ALL_FOOD } from "../utils/queries";
import { SAVE_TO_CART, DELETE_FROM_CART } from "../utils/mutations";

export default function MenuPage() {
  const { loading, data } = useQuery(QUERY_ALL_FOOD);
  const allFood = data?.allFood || {};
  console.log(allFood);

  return (
    <div>
      <div>Side Menu Navbar placeholder</div>
      <div>
        <div>pizza</div>
        <div>Side orders</div>
        <div>Beverages</div>
      </div>

      <div>side cart container placeholder</div>
    </div>
  );
}
