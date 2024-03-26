import './sideMenu.css'

export default function SideMenu() {
    return (
      <div className="menu-container">
        <span className="menu-span">Menu</span>
        <div className="menu-nav-container"> 
          <a className="menu-nav-text-bar" href="#top">To the Top</a>
          <a className="menu-nav-text-bar" href="#pizza">Pizza</a>
          <a className="menu-nav-text-bar" href="#side-orders">Side Orders</a>
          <a className="menu-nav-text-bar" href="#beverage">Beverage</a>
        </div>
      </div>
    );
  }