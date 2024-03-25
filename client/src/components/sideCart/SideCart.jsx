import "./SideCart.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_FROM_CART } from "../../utils/mutations";

export default function SideCart() {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  console.log("userData: ", userData);
  const userCart = userData.cart;
  console.log("userCart: ", userCart);

  let paymentDetails ={};
  if (userCart.length > 0) {
    let subtotal = 0;
    for (let i; i < userCart.length; i++) {
      subtotal = subtotal + userCart[i].price;
    }
    subtotal.toFixed(2);
    const tax = (subtotal * 0.105).toFixed(2);
    const total = (subtotal + tax).toFixed(2);
    paymentDetails = {subtotal:subtotal, tax:tax, total:total};
    return paymentDetails;
  }
  console.log(paymentDetails);
  
  const [delelteCartItem, { error }] = useMutation(DELETE_FROM_CART, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    //Todo: add queries to combine with the stripe and jump to payment page
  };

  const handleDeleteCartItem = async (event, foodName) => {
    event.preventDefault();
    // does not require user to log in
    try {
      console.log("handleDel3teCartItem: (foodName) ", foodName);
      const { data } = await delelteCartItem({ variables: foodName });
    } catch (error) {
      console.log("something went wrong!");
      console.log(error);
    }
  };

  // optional
  // wishlist func is the function valid after user logged in
  const handleDeleteWishlistItem = (event, foodName) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
  };
  // optional
  const handleWishlistToCart = (event, foodName) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
  };
  //optional
  const handleCartToWishlist = (event, foodName) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
  };

  if (loading) {
    return <div>Loading...Cart!</div>;
  }

  return (
    <div className="sideCart-container">
      {userData.cart.length > 0 ? (
        <>
          <span>{userData.cart.length > 1 ? "Order" : "Orders"}</span>
          <div className="populatedCart-container">
            {userCart.map((items) => {
              return (
                <div className="cartItems">
                  <div>{items.foodName}</div>
                  <div>{items.price}</div>
                  <button onClick={() => handleDeleteCartItem(items.foodName)}>
                    delete from cart icon
                  </button>
                </div>
              );
            })}
          </div>
          <span>{`${paymentDetails.subtotal}$`}</span>
          <span>{`${paymentDetails.tax}$`}</span>
          <span>{`${paymentDetails.total}$`}</span>
          <button onClick={() => handleOrderSubmit()}>Confirm Order</button>
        </>
      ) : (
        <div className="emptyCart-container">
          <img
            src="../../../assets/images/shoppingBag.png"
            alt={"shopping bag"}
          />
          <span className="emptyCart-span">
            Let's begin with adding orders from the menu to your cart!
          </span>
        </div>
      )}
    </div>
  );
}
