import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { CREATE_USER } from "../../utils/mutations";

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
      <span>Sign Up Form</span>
      <form onSubmit={handleFormSubmit}>
      <input
          value={userFormData.firstName}
          name="firstName"
          onChange={handleFormChange}
          type="text"
          placeholder="first name"
        />
         <input
          value={userFormData.lastName}
          name="lastName"
          onChange={handleFormChange}
          type="text"
          placeholder="last name"
        />
        <input
          value={userFormData.email}
          name="email"
          onChange={handleFormChange}
          type="email"
          placeholder="email"
        />
       <input
          value={userFormData.password}
          name="password"
          onChange={handleFormChange}
          type="text"
          placeholder="password"
        />
      </form>
    </div>
  );
};

export default SignupForm;
