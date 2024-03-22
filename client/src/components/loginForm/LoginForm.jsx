import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(CREATE_USER);

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
    } catch (err) {
      console.error(err);
      console.log(error);
    }
  };

  return (
    <div>
      <span>login</span>
      <form onSubmit={handleFormSubmit}>
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

export default LoginForm;
