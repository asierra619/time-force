import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { CREATE_USER } from "../../utils/mutations";
import "./SignupForm.css";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    //update the state by the key specified by the name variable with the value provided
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
     // console.log("userFromData", userFormData);
      const { data } = await createUser({
        variables: { ...userFormData },
      });

    //  console.log("SignUp mutation return data: ", data);
      Auth.login(data.createUser.token);

      setUserFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signUp-form-container">
      <span className="signUp-form-span">Sign Up Form</span>
      <form className="signUp-form-content">
        <span><strong>First Name</strong>:</span>
        <input
          className="signUp-input"
          value={userFormData.firstName}
          name="firstName"
          onChange={handleFormChange}
          type="text"
          placeholder="your first name"
        />
        <span><strong>Last Name</strong>:</span>
        <input
          className="signUp-input"
          value={userFormData.lastName}
          name="lastName"
          onChange={handleFormChange}
          type="text"
          placeholder="your last name"
        />
        <span><strong>Email</strong>:</span>
        <input
          className="signUp-input"
          value={userFormData.email}
          name="email"
          onChange={handleFormChange}
          type="email"
          placeholder="your email"
        />
        <span><strong>Password</strong>:(your password must include at least: one uppercase letter, one numeric character and one special character!)</span>
        <input
          className="signUp-input"
          value={userFormData.password}
          name="password"
          onChange={handleFormChange}
          type="text"
          placeholder="your password"
        />
        <button className="signUp-submit-btn" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
