import "./SideCart.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_FROM_CART } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function SideCart() {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  // console.log("userData: ", userData);
  const userCart = userData?.cart || {};
  console.log("userCart: ", userCart);

  let paymentDetails = [];

  if (userCart.length > 0) {
    console.log("userCart length:", userCart.length);
    console.log("starting for loop");
    let subtotal = 0;
    for (let i = 0; i < userCart.length; i++) {
      console.log("useCart[i].price: ", userCart[i].price);
      subtotal += userCart[i].price;
    }
    subtotal = parseFloat(subtotal.toFixed(2));
    const tax = parseFloat((subtotal * 0.105).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));
  
    paymentDetails = [subtotal, tax, total];
    console.log("payment details: ", paymentDetails);
  }

  const [delelteCartItem, { error }] = useMutation(DELETE_FROM_CART, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    //Todo: add reducer queries to combine with the stripe and jump to payment page
  };

  //Todo: add reducer queriss to handle this function
  const handleDeleteCartItem = async (foodName) => {
    //event.preventDefault();
    try {
      console.log("handleDeleteCartItem: (foodName) ", foodName);
      const { data } = await delelteCartItem({ variables: {foodName} });
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
      {userCart !== undefined && userCart.length > 0 ? (
        <>
          {userCart.length > 1 ? <span>Orders</span> : <span>Order</span>}
          <div className="populatedCart-container">
            {userCart.map((items, index) => {
              return (
                <div key={index} className="cartItems">
                  <div>{items.foodName}</div>
                  <div>{items.price}</div>
                  <button onClick={() => handleDeleteCartItem(items.foodName)}>
                    delete from cart icon
                  </button>
                </div>
              );
            })}
          </div>
          <span>{`SubTotal: ${paymentDetails[0]}$`}</span>
          <span>{`Tax: ${paymentDetails[1]}$`}</span>
          <span>{`Total: ${paymentDetails[2]}$`}</span>
          <button onClick={() => handleOrderSubmit()}>Confirm Order</button>
        </>
      ) : (
        <div className="emptyCart-container">
          <img
            src="../../../assets/images/shoppingBag.png"
            alt={"shopping bag"}
          />
          {Auth.loggedIn() ? (
            <span>
              Let's begin with adding orders from the menu to your cart!
            </span>
          ) : (
            <span>Login In first to see your cart </span>
          )}
        </div>
      )}
    </div>
  );
}
