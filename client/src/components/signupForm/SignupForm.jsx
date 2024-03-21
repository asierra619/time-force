import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { CREATE_USER } from "../../utils/mutations";

const signupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("userFromData", userFormData);
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      console.log("SignUp mutation return data: ", data);
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <span>login</span>
      <form onSubmit={handleFormSubmit}>
      <input
          value={firstName}
          name="firstName"
          onChange={handleFormChange}
          type="text"
          placeholder="first name"
        />
         <input
          value={lastName}
          name="lastName"
          onChange={handleFormChange}
          type="text"
          placeholder="last name"
        />
        <input
          value={email}
          name="email"
          onChange={handleFormChange}
          type="email"
          placeholder="email"
        />
       <input
          value={password}
          name="password"
          onChange={handleFormChange}
          type="text"
          placeholder="password"
        />
      </form>
    </div>
  );
};

export default signupForm;
