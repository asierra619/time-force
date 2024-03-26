import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";
import "./LoginForm.css"
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    //update the state by the key specified by the name variable with the value provided
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("userFormData", userFormData);

      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log("login mutation data return: ", data);
      Auth.login(data.login.token);

      setUserFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      // console.log(error);
    }
  };

  return (
    <div className="login-form-container">
      <span className="login-form-span">Login Form</span>
      <form className="login-form-content" onSubmit={handleFormSubmit}>
        <span><strong>Email</strong>:</span>
        <input className="form-input"
          value={userFormData.email}
          name="email"
          onChange={handleFormChange}
          type="email"
          placeholder="your email"
        />
        <span><strong>Password</strong>:</span>
        <input className="form-input"
          value={userFormData.password}
          name="password"
          onChange={handleFormChange}
          type="text"
          placeholder="your password"
        />
      </form>
      <button className="form-submit-btn" onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default LoginForm;
