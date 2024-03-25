import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_ALL_PIZZA, QUERY_ALL_SIDEORDERS, QUERY_ALL_BEVERAGE } from "../utils/queries";
import { SAVE_TO_CART, DELETE_FROM_CART } from "../utils/mutations";

export default function MenuPage() {
  /*
  const { loading, data } = useQuery(QUERY_ALL_FOOD);
  const allFood = data?.allFood || {};
  console.log(allFood);
  */
  const { loading: loadingPizza, data:dataPizza } = useQuery(QUERY_ALL_PIZZA);
  const allPizza = dataPizza?.allPizza || {};
  console.log("allPizza",allPizza);

  const { loading: loadingSideOrder , data:dataSideOrder } = useQuery(QUERY_ALL_SIDEORDERS);
  const allSideOrders = dataSideOrder?.allSideOrder || {};
  console.log("allSideOrders", allSideOrders);

  const { loading:loadingBeverage, data:dataBeverage } = useQuery(QUERY_ALL_BEVERAGE);
  const allBeverage = dataBeverage?.allBeverage || {};
  console.log("allBeverage",allBeverage);

   if(loadingPizza || loadingSideOrder || loadingBeverage ){
    return(<div>loaing...</div>)
   }
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
