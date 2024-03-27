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
 // console.log("userCart: ", userCart);

  let paymentDetails = [];

  if (userCart.length > 0) {
   //console.log("userCart length:", userCart.length);
  // console.log("starting for loop");
    let subtotal = 0;
    for (let i = 0; i < userCart.length; i++) {
     // console.log("useCart[i].price: ", userCart[i].price);
      subtotal += userCart[i].price;
    }
    subtotal = parseFloat(subtotal.toFixed(2));
    const tax = parseFloat((subtotal * 0.105).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));
  
    paymentDetails = [subtotal, tax, total];
  //  console.log("payment details: ", paymentDetails);
  }

  const [delelteCartItem, { error }] = useMutation(DELETE_FROM_CART, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const handleOrderSubmit = () => {
    
    window.alert("Order Submitted!");
    //Todo: add reducer queries to combine with the stripe and jump to payment page
  };

  //Todo: add reducer queriss to handle this function
  const handleDeleteCartItem = async (_id) => {
    //event.preventDefault();
    try {
    //  console.log("handleDeleteCartItem: (foodName) ", _id);
      const { data } = await delelteCartItem({ variables: {_id} });
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
          {userCart.length > 1 ? <span className="sideCart-order-span">Orders</span> : <span className="sideCart-order-span">Order</span>}
          <div className="populatedCart-container">
            {userCart.map((items, index) => {
              return (
                <div key={index} className="cartItems">
                  <div className="cartItems-foodName">{items.foodName}</div>
                  <div className="cartItems-price">{`$${items.price}`}</div>
                  <button className="cartItems-delete-btn"  onClick={() => handleDeleteCartItem(items._id)}>
                    delete from cart
                  </button>
                </div>
              );
            })}
          </div>
          <div className="paymentDetails-container">
          <span className="paymentDetails-span">{`SubTotal: $${paymentDetails[0]}`}</span>
          <span className="paymentDetails-span">{`Tax: $${paymentDetails[1]}`}</span>
          <span className="paymentDetails-span">{`Total: $${paymentDetails[2]}`}</span>
          <button className="paymentDetails-submit-btn" onClick={() => handleOrderSubmit()}>Confirm Order</button>
          </div>
        </>
      ) : (
        <div className="emptyCart-container">
          <img className="emptyCart-shopping-bag-icon"
            src="https://i.fbcd.co/products/original/667ca7502e4e218f01e4fbb26e01e2fc7fe17370f64bf444f60818b9d1b2c2b2.jpg"
            alt={"shopping bag"}
          />
          {Auth.loggedIn() ? (
            <span className="afterLogin-empty-cart-span">
              Let's begin with adding orders from the menu to your cart!
            </span>
          ) : (
            <span className="beforeLogin-cart-span">Login In first to see your cart </span>
          )}
        </div>
      )}
    </div>
  );
}

// alt shopping bag picture https://i.fbcd.co/products/original/667ca7502e4e218f01e4fbb26e01e2fc7fe17370f64bf444f60818b9d1b2c2b2.jpg
// import{} from '../../../assets/images/shoppingBag.png'