import './SideMenu.css'

export default function SideMenu() {
    return (
      <div className="menu-container">
        <span className="menu-span">Menu</span>
        <div className="menu-nav-container"> 
          <a href="#top">To the Top</a>
          <a href="#pizza">Pizza</a>
          <a href="#side-orders">Side Orders</a>
          <a href="#beverage">Beverage</a>
        </div>
      </div>
    );
  }