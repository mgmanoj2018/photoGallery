// import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import React, { useState } from "react";
import Photo from './Pages/Photo/Photo';
import Favourites from './Pages/Favourites/Favourites';
import {Route, Routes} from 'react-router-dom'
function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    console.log("sdf");
    e.preventDefault();
    setQuery(e.target[0].value);
   
  };
  
  return (
    <div className="App">
        <NavBar query={query} handleSearch={handleSearch}></NavBar>
        <Routes>
    <Route path="/" element={<Photo/>} />
    <Route path="/favourites" element={<Favourites/>} />  
  </Routes>
    </div>
  );
}

export default App;
