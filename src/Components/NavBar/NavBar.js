// NavBar.js
import React, { useState } from "react";
import "./NavBar.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  return (
    <div className="navcontainer">
      <div className="logo">
        <h2>FOTOFLIX</h2>
      </div>
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search For Photos.."
        />
        <button type="submit">
          <FaSearch fontSize={30} />
        </button>
      </form>
      <div className="favBtn">
      <Link to='/favourites' >
        <button>Favourites</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
