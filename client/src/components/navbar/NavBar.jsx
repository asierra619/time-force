import { useState } from "react";
import { Form, Link } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import SignupForm from "../signupForm/SignupForm";
import Auth from "../../utils/auth";
import "./NavBar.css";

export default function NavBar() {
  const [showForm, setShowForm] = useState(false);
  const [formTab, setFormTab] = useState("login");

  const toggleForm =() => {
    if(showForm === false){
      setShowForm(true);
    } else {setShowForm(false)}
  }

  return (
    <>
      <div>title</div>
      {Auth.loggedIn() ? (
        <>
          <div onClick={Auth.logout}>Log Out</div>
        </>
      ) : (
        <div>
          <img src=""></img>
          <button onClick={() => toggleForm()}>Login / Sign Up</button>
        </div>
      )}
      <div className={showForm ? "" : "form-hidden"}>
        <div className="form-container">
          <div className="tab-container">
            <button onClick={() => setFormTab("login")}>Login</button>
            <button onClick={() => setFormTab("signUp")}>Sign Up</button>
          </div>
          <div
            key={1}
            className={formTab === "login" ? "formTab-highlight" : "tab-hidden"}
          >
            <LoginForm />
          </div>
          <div
            key={2}
            className={
              formTab === "signUp" ? "formTab-highlight" : "tab-hidden"
            }
          >
            <SignupForm />
          </div>
          <button onClick={() => setShowForm(false)}>x</button>
        </div>
      </div>
    </>
  );
}
// modal component is similar to custom alert box
//onHide={()=>setShowForm(false)}
//styling fix the nav bar on the top of the screen  vh10

// fix the login/signUp form below the icon and span
