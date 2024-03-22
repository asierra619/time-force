import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import SignupForm from "../signupForm/SignupForm";
import Auth from "../../utils/auth";

export default function NavBar() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>title</div>
      {Auth.loggedIn() ? (
        <>
          <div>Show Cart</div>
          <button onClick={Auth.logout}>Log Out</button>
        </>
      ) : (
        <button onClick={() => setShowForm(true)}>Login or Sign Up</button>
      )}

      <AuthForm
      show={showForm}
      onHide={()=>setShowForm(false)}>
        
      </AuthForm>
    </>
  );
}
