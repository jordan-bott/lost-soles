import { useState } from "react";
import { useCreateAdminMutation } from "../../store/authApi";
import logo from "../../images/title-logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const [createAdmin] = useCreateAdminMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handlePasswordConfirmationChange = (event) => {
    const value = event.target.value;
    setPasswordConfirmation(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleProfilePicChange = (event) => {
    const value = event.target.value;
    setProfilePic(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createAdmin({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
      email: email,
      address: address,
      profile_pic: profilePic,
    });
    if (!result.hasOwnProperty("error")) {
      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
      setEmail("");
      setAddress("");
      setProfilePic("");
      toast(`Welcome to the Lost Soles team! 🧦`);
      navigate("/");
    } else if (result.error.hasOwnProperty("data")) {
      toast(`${result.error.data.detail}`);
    } else {
      toast("Username or email already exists.");
    }
  };

  return (
    <>
      <div className="flex flex-col place-content-center items-center w-[100%] h-[100%] pb-32">
        <div>
          <img
            src={logo}
            alt="Lost Soles logo. The L in lost and soles are made of socks! Has small subtitle: find your sole mate!"
            className="w-[750px] pt-32"
          />
        </div>
        <div className="flex place-content-center pt-12 w-[600px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col place-content-center w-100%"
          >
            <div className="flex gap-x-10 w-[100%]">
              <div>
                <p className="text-xl pt-2 pb-1 pl-1">First Name</p>
                <input
                  type="text"
                  name="first_name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
                <p className="text-xl pt-2 pb-1 pl-1">Last Name</p>
                <input
                  type="text"
                  name="last_name"
                  onChange={handleLastNameChange}
                  value={lastName}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
                <p className="text-xl pt-2 pb-1 pl-1">Username</p>
                <input
                  type="text"
                  name="username"
                  onChange={handleUsernameChange}
                  value={username}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
                <p className="text-xl pt-2 pb-1 pl-1">Email</p>
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
              </div>
              <div className="relative">
                <p className="text-xl pt-2 pb-1 pl-1">Password</p>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handlePasswordChange}
                  value={password}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-[87.25%] top-[13.25%] hover:scale-105"
                >
                  <img
                    src="https://img.icons8.com/material-outlined/24/79aadd/visible--v1.png"
                    alt="cartoon eye"
                  />
                </button>
                <p className="text-xl pt-2 pb-1 pl-1">Password Confirmation</p>
                <input
                  type={showPasswordConfirmation ? "text" : "password"}
                  name="password_confirmation"
                  onChange={handlePasswordConfirmationChange}
                  value={passwordConfirmation}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                  className="absolute left-[87.25%] top-[38.5%] hover:scale-105"
                >
                  <img
                    src="https://img.icons8.com/material-outlined/24/79aadd/visible--v1.png"
                    alt="cartoon eye"
                  />
                </button>
                <p className="text-xl pt-2 pb-1 pl-1">Address</p>
                <input
                  type="text"
                  name="address"
                  onChange={handleAddressChange}
                  value={address}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
                <p className="text-xl pt-2 pb-1 pl-1">Profile Picture URL</p>
                <input
                  type="text"
                  name="profile_pic"
                  onChange={handleProfilePicChange}
                  value={profilePic}
                  className="bg-yellow rounded-lg h-10 border-blue border-2 px-4 pt-[.75px] w-[250px]"
                />
              </div>
            </div>
            <div className="flex place-content-center pt-4 w-[100%]">
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

export default AdminSignup;
