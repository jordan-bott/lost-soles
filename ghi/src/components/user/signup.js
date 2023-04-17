import { useState } from "react";
import { useCreateUserMutation } from "../../store/usersApi";
import { BiShow } from "react-icons/bi";

function Signup() {
  const [createUser, result] = useCreateUserMutation();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      password_confirmation: passwordConfirmation,
      email: email,
      address: address,
      profile_pic: profilePic,
    });
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
    setEmail("");
    setAddress("");
    setProfilePic("");
  };

  if (result.isSuccess) {
    console.log("success!");
  } else {
    console.log("error T_T");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            onChange={handleFirstNameChange}
            value={firstName}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            onChange={handleLastNameChange}
            value={lastName}
          />
        </label>
        <label>
          Username:
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
        <label>
          Password Confirmation:
          <input
            type={showPasswordConfirmation ? "text" : "password"}
            name="password_confirmation"
            onChange={handlePasswordConfirmationChange}
            value={passwordConfirmation}
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
          >
            <BiShow />
          </button>
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={handleEmailChange}
            value={email}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            onChange={handleAddressChange}
            value={address}
          />
        </label>
        <label>
          Profile Pic:
          <input
            type="text"
            name="profile_pic"
            onChange={handleProfilePicChange}
            value={profilePic}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Signup;
