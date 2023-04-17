import { useLoginMutation } from "../../store/authApi";
import { useState } from "react";
import { BiShow } from "react-icons/bi";

function Login() {
  const [loginUser, result] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser({ username: username, password: password });
    setUsername("");
    setPassword("");
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  console.log(result);

  if (result.isSuccess) {
    console.log("success!");
  } else {
    console.log("error T_T");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            onChange={handleUsernameChange}
            value={username}
          />
        </label>
        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handlePasswordChange}
            value={password}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <BiShow />
          </button>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Login;
