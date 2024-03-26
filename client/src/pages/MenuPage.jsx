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
import SideMenu from "../components/sideMenu/sideMenu.jsx";
import SideCart from "../components/sideCart/SideCart.jsx";

export default function MenuPage() {
  /* //testing data
  const { loading, data } = useQuery(QUERY_ALL_FOOD);
  const allFood = data?.allFood || {};
  console.log(allFood);
  */

  const [saveToCart, { error }] = useMutation(SAVE_TO_CART, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const { loading: loadingPizza, data: dataPizza } = useQuery(QUERY_ALL_PIZZA);
  const allPizza = dataPizza?.allPizza || {};
  //console.log("allPizza", allPizza);

  const { loading: loadingSideOrder, data: dataSideOrder } =
    useQuery(QUERY_ALL_SIDEORDERS);
  const allSideOrder = dataSideOrder?.allSideOrder || {};
 // console.log("allSideOrders", allSideOrder);

  const { loading: loadingBeverage, data: dataBeverage } =
    useQuery(QUERY_ALL_BEVERAGE);
  const allBeverage = dataBeverage?.allBeverage || {};
  //console.log("allBeverage", allBeverage);

  // Todo: accept price as a argument and send to DB
  const handleSaveToCart = async ({ foodName, price }) => {
    
    console.log("handleSavetoCart: ",{ foodName, price });
    try {
      const { data } = saveToCart({
        variables: { foodName, price },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingPizza || loadingSideOrder || loadingBeverage) {
    return <div>loaing...</div>;
  }

  return (
    <>
    <div>
      <div>
        <div id={"pizza"}>Pizza</div>
        {allPizza.length ? (
          allPizza.map((item) => {
            return (
              <div key={item.foodName} className="foodCard-container">
                <div>{item.foodName}</div>
                <img src={item.image} alt={item.description} />
                <div>{`price: $${item.price}`}</div>
                {Auth.loggedIn() ? (
                  <button onClick={() =>handleSaveToCart({foodName: item.foodName,price: item.price,})}>
                    Add to Cart
                  </button>
                ) : (<div></div>)}
              </div>
            );
          })
        ) : (
          <div>Sorry, No Pizza is in Stock!</div>
        )}
        <div id={"side-orders"}>Side Orders</div>
        {allSideOrder.length ? (
          allSideOrder.map((item) => {
            return (
              <div key={item.foodName} className="foodCard-container">
                <div>{item.foodName}</div>
                <img src={item.image} alt={item.description} />
                <div>{`price: $${item.price}`}</div>
                {Auth.loggedIn() ? (
                  <button onClick={() =>handleSaveToCart({foodName: item.foodName,price: item.price,})}>
                    Add to Cart
                  </button>
                ) : (<div></div>)}
              </div>
            );
          })
        ) : (
          <div>Sorry, No Side Order is in Stock!</div>
        )}
        <div id={"beverage"}>Beverage</div>
        {allBeverage.length ? (
          allBeverage.map((item) => {
            return (
              <div key={item.foodName} className="foodCard-container">
                <div>{item.foodName}</div>
                <img src={item.image} alt={item.description} />
                <div>{`price: $${item.price}`}</div>
                {Auth.loggedIn() ? (
                  <button onClick={() =>handleSaveToCart({foodName: item.foodName,price: item.price,})}>
                    Add to Cart
                  </button>
                ) : (<div></div>)}
              </div>
            );
          })
        ) : (
          <div>Sorry, No Beverage is in Stock!</div>
        )}
      </div>

      
    </div>
    <SideCart/>
    <SideMenu />
    </>
  );
}
