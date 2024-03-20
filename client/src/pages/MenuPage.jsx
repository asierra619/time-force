import Nav from "../components/NavBar.jsx";
import Menu from "../components/Menu.jsx";
import Cart from "../components/MyCart";

const Home = () => {
  return (
    <div className="container">
      <Nav />
      <Menu />
      <Cart />
    </div>
  );
};

export default Home;
