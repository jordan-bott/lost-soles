import { useLoginMutation } from "../../store/authApi";
import { useState } from "react";
import logo from "../../images/title-logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [loginUser] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginUser({ username: username, password: password });

    if (!result.hasOwnProperty("error")) {
      setUsername("");
      setPassword("");
      toast(`Welcome back! Go find your sole mate 🧦`);
      navigate("/");
    } else {
      toast("Incorrect username or password 🥲");
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <>
      <div className="flex flex-col place-content-center items-center w-[100%] h-[100%]">
        <div>
          <img
            src={logo}
            alt="Lost Soles logo. The L in lost and soles are made of socks! Has small subtitle: find your sole mate!"
            className="w-[600px] pt-44"
          />
        </div>
        <div className="pt-12 w-[350px] relative">
          <form onSubmit={handleSubmit} className="flex flex-col w-[100%]">
            <p className="text-xl pb-1">Username</p>
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange}
              value={username}
              className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px]"
            />
            <p className="text-xl pt-2 pb-1">Password</p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handlePasswordChange}
              value={password}
              className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-[90%] top-[63%] hover:scale-105"
            >
              <img
                src="https://img.icons8.com/material-outlined/24/79aadd/visible--v1.png"
                alt="cartoon eye"
              />
            </button>
            <div className="flex justify-end w-[100%] pt-2">
              <input
                type="submit"
                value="Submit"
                className="text-lg bg-lorange border-blue border-2 p-1 mr-2 mt-1 w-[35%] rounded-lg hover:scale-105"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
