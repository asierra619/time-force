import "./SideCart.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";

export default function SideCart() {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  console.log(userData);

  const [delelteCartItem, { error }] = useMutation(DELETE_FROM_CART, {
    refetchQueries: [QUERY_ME, "me"],
  });

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
  const handleWishlistToCart =(event,foodName) =>{
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
  }
  //optional
  const handleCartToWishlist =(event,foodName) =>{
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
  }


  if (loading) {
    return <div>Loading...Cart!</div>;
  }

  return (
    <div className="sideCart-container">
      {userData.cart.length > 0 ? (
        <div></div>
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
