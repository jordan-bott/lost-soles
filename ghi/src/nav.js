import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import titleLogo from "./images/title-logo.png";
import { useGetTokenQuery } from "./store/authApi";
import { useLogoutMutation } from "./store/authApi";

function Nav() {
  const [dropdown, setDropdown] = useState(false);
  const { data, isLoading } = useGetTokenQuery();
  const [logoutUser, result] = useLogoutMutation();

  if (isLoading) {
    return <progress className="progress is-primary" max="100" />;
  }

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  async function handleLogout() {
    logoutUser();
  }

  if (result.isSuccess) {
    console.log("logged out!");
  } else {
    console.log("error");
  }

  return (
    <>
      <div className="flex justify-between items-center px-8 py-1 bg-tan border-b-2 border-blue">
        <div>
          <NavLink className="items-start" to="/">
            <img
              className="hover:scale-105"
              src={titleLogo}
              width={290}
              alt="Lost Soles logo. The L in lost and soles are made of socks! Has small subtitle: find your sole mate!"
            />
          </NavLink>
        </div>
        <div
          className="items-center"
          onMouseEnter={() => handleDropdown(true)}
          onMouseLeave={() => handleDropdown(false)}
        >
          <button className="block items-center pb-1">
            <img
              className="items-center hover:scale-105"
              src={logo}
              width={70}
              alt="Lost soles logo of two socks. One sock is made out of a dotted line, because it's missing! The other sock is yellow with an orange toe and heel."
            />
          </button>
          {dropdown ? (
            <div className="text-blue border-blue bg-background bg-w-32 border-2 rounded-md shadow-xl absolute right-4 divide-y divide-orange px-3">
              {data === null ? null : (
                <div className="block px-2 py-2 text-l">
                  <p>{data.account.username}</p>
                  <p className="text-sm">{data.account.email}</p>
                </div>
              )}

              <NavLink className="block px-2 py-2 hover:text-orange" to="/">
                Feed
              </NavLink>
              {data === null ? (
                <>
                  <NavLink
                    className="block hover:text-orange py-2 px-2"
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="hover:text-orange block py-2 px-2"
                    to="/signup"
                  >
                    SignUp!
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="block px-2 py-2 hover:text-orange"
                    to="/socks/create"
                  >
                    Post a Sock!
                  </NavLink>
                  <NavLink
                    className="block px-2 py-2 hover:text-orange"
                    to="/socks/sockdrawer"
                  >
                    Sock Drawer
                  </NavLink>
                  {data.account.type === "admin" ? (
                    <>
                      <NavLink
                        className="block px-2 py-2 hover:text-orange"
                        to="/users"
                      >
                        User List
                      </NavLink>
                      <NavLink
                        className="block px-2 py-2 hover:text-orange"
                        to="/verifications"
                      >
                        Verification List
                      </NavLink>
                    </>
                  ) : null}
                  <div className="border-t-4">
                    <button
                      className="inline px-2 py-2 hover:text-orange"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <p></p>
    </>
  );
}
export default Nav;
