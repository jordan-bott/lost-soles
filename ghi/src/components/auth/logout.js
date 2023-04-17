import { useLogoutMutation } from "../../store/authApi";

function Logout() {
  const [logoutUser, result] = useLogoutMutation();

  async function handleLogout() {
    logoutUser();
  }

  if (result.isSuccess) {
    console.log("logged out!");
  } else {
    console.log("error");
  }

  return (
    <form onSubmit={handleLogout}>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Logout;
