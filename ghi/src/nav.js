import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import titleLogo from "./images/title-logo.png";

function Nav() {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
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
            <NavLink className="block px-2 py-2 hover:text-orange" to="/">
              Feed
            </NavLink>
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
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default Nav;
