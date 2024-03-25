import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {
  QUERY_ME,
  QUERY_ALL_PIZZA,
  QUERY_ALL_SIDEORDERS,
  QUERY_ALL_BEVERAGE,
} from "../utils/queries";
import { SAVE_TO_CART, DELETE_FROM_CART } from "../utils/mutations";

export default function MenuPage() {
  /*
  const { loading, data } = useQuery(QUERY_ALL_FOOD);
  const allFood = data?.allFood || {};
  console.log(allFood);
  */
  const { loading: loadingPizza, data: dataPizza } = useQuery(QUERY_ALL_PIZZA);
  const allPizza = dataPizza?.allPizza || {};
  console.log("allPizza", allPizza);

  const { loading: loadingSideOrder, data: dataSideOrder } =
    useQuery(QUERY_ALL_SIDEORDERS);
  const allSideOrder = dataSideOrder?.allSideOrder || {};
  console.log("allSideOrders", allSideOrder);

  const { loading: loadingBeverage, data: dataBeverage } =
    useQuery(QUERY_ALL_BEVERAGE);
  const allBeverage = dataBeverage?.allBeverage || {};
  console.log("allBeverage", allBeverage);

  if (loadingPizza || loadingSideOrder || loadingBeverage) {
    return <div>loaing...</div>;
  }

  return (
    <div>
      <div>Side Menu Navbar placeholder</div>
      <div>
        {allPizza.length ? (
          allPizza.map((item) => {
            return (
              <div key={item.foodName} className="foodCard-container">
                <div>{item.foodName}</div>
                <img src={item.image} alt={item.description}/>
                <div>{`price: ${item.price}$`}</div>
                <span></span>
              </div>
            );
          })
        ) : (
          <div>Sorry, No Pizza is in Stock!</div>
        )}
        {allSideOrder.length ? (
          allSideOrder.map((item) => {
            return (
              <div key={item.foodName} className="foodCard-container">
                <div>{item.foodName}</div>
                <img src={item.image} alt={item.description}/>
                <div>{`price: ${item.price}$`}</div>
                <span></span>
              </div>
            );
          })
        ) : (
          <div>Sorry, No Pizza is in Stock!</div>
        )}
        {allBeverage.length ? (
          allBeverage.map((item) => {
            return (
              <div key={item.foodName} className="foodCard-container">
                <div>{item.foodName}</div>
                <img src={item.image} alt={item.description}/>
                <div>{`price: ${item.price}$`}</div>
                <span></span>
              </div>
            );
          })
        ) : (
          <div>Sorry, No Pizza is in Stock!</div>
        )}
      </div>

      <div>side cart container placeholder</div>
    </div>
  );
}
