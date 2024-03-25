import { useState } from "react";
//import { Form, Link } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import SignupForm from "../signupForm/SignupForm";
import Auth from "../../utils/auth";
import "./NavBar.css";
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
      <div>Project Title</div>
      {Auth.loggedIn() ? (
        <>
          <span>{`${'Welcome! ' + userData.firstName + ' '+ userData.lastName}`}</span>       
          <button onClick={Auth.logout}>Log Out</button>
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
            <button onClick={() => setFormTab("login")} className={formTab === "login" ? "formTab-highlight" : ""}>Login</button>
            <button onClick={() => setFormTab("signUp")}  className={
              formTab === "signUp" ? "formTab-highlight" : ""}>Sign Up</button>
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
          <button onClick={() => setShowForm(false)}>x</button>
        </div>
      </div>
    </>
  );
}


//styling fix the nav bar on the top of the screen  vh10

// fix the login/signUp form below the icon and span
