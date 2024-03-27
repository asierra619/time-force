import { useState } from "react";
//import { Form, Link } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import SignupForm from "../signupForm/SignupForm";
import Auth from "../../utils/auth";
import "./index.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';


export default function NavBar() {
  const [showForm, setShowForm] = useState(false);
  const [formTab, setFormTab] = useState("login");
// query_me will use data from context after login
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || {}
  console.log("userData", userData)

  const toggleForm = () => {
    if(showForm === false){
      setShowForm(true);
    } else {setShowForm(false)}
  }

  if(loading) {
    return(<div>loading...</div>)
  }

  return (
    <>
    <div className="navbar-container">
      <div id={"top"} className="title">Time Force pizzeria</div>
      {Auth.loggedIn() ? (
      <>
        <span className="navbar-span">{`${'Welcome back! ' + userData.firstName + ' '+ userData.lastName}`}</span>
        <div className="login-logout-icon-button-container" onClick={Auth.logout}>
          <img className="logout-icon" src="./logout-icon.png" alt="logout icon"></img>       
          <button className="login-logout-button" >Log Out</button>
        </div>
      </>
      ) : (
      <>
        <span className="navbar-span">Hello, Guest!</span>
        <div className="login-logout-icon-button-container" onClick={() => toggleForm()}>
          <img className="login-icon" src="./login-icon2.png" alt="login icon"></img>
          <button className="login-logout-button" >Login / Sign Up</button>
        </div>
      </>
      )}

    </div>
    <div className={showForm ? "form-show" : "form-hidden"}>
          <div className="form-container">
            <div className="tab-container">
              <button  onClick={() => setFormTab("login")} className={formTab === "login" ? "formTab-highlight formTabs" : "formTabs"}>Login</button>
              <button  onClick={() => setFormTab("signUp")}  className={
                formTab === "signUp" ? "formTab-highlight formTabs" : "formTabs"}>Sign Up</button>
            </div>
            <div
              key={1}
              className={formTab === "login" ? "" : "tab-hidden"}
            >
              <LoginForm />
            </div>
            <div
              key={2}
              className={formTab === "signUp" ? "" : "tab-hidden"}
            >
              <SignupForm />
            </div>
            <button className="hide-form-btn" onClick={() => setShowForm(false)}>x</button>
          </div>
        </div>
        </>
  );
}


//styling fix the nav bar on the top of the screen  vh10

// fix the login/signUp form below the icon and span
