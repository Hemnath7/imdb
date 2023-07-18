import React from "react";
import logo from "../download.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="border flex items-center space-x-8 pl-8 py-8">
      <Link to="/">
        <img src={logo} className="w-[60px]" />
      </Link>

      <Link to="/" className="font-bold text-xl text-blue-500">
        Movies
      </Link>
      <Link to="/favorites" className="font-bold text-blue-500">
        Favorites
      </Link>
    </div>
  );
}

export default NavBar;
