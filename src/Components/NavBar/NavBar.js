// import React, { useState } from "react";
import "./NavBar.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const NavBar = ({query,handleSearch}) => {
 
  return (
    <div className="navcontainer">
      <div className="logo">
        <Link to="/">
         
          <h2>FOTOFLIX</h2>
        </Link>
      </div>
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          query={query}
          placeholder="Search For Photos.."
        />
        <span>
          <FaSearch fontSize={30} />
        </span>
      </form>
      <div className="favBtn">
        <Link to="/favourites">
          <button>Favourites</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
