import { useState } from "react";
import { Form, Link } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import SignupForm from "../signupForm/SignupForm";
import Auth from "../../utils/auth";

export default function NavBar() {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <>
      <div>title</div>
      {Auth.loggedIn() ? (
        <>
          <div>Show Cart</div>
          <div onClick={Auth.logout}>Log Out</div>
        </>
      ) : (
        <div onClick={() => setShowForm(true)}>Login /or Sign Up</div>
      )}

      <AuthForm
      show={showForm}
      onHide={()=>setShowForm(false)}
      >
      </AuthForm>
    </>
  );
}
// modal component is similar to custom alert box