// App.js
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import React, { useState } from "react";
import Photo from './Pages/Photo/Photo';
import Favourites from './Pages/Favourites/Favourites';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  const handleFavoritePhoto = (photo) => {
    const existing = favoritePhotos.find((favPhoto) => favPhoto.id === photo.id);
    if (existing) {
      setFavoritePhotos(favoritePhotos.filter((favPhoto) => favPhoto.id !== photo.id));
    } else {
      setFavoritePhotos([...favoritePhotos, photo]);
    }
  };

  return (
    <div className="App">
      <NavBar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Photo searchQuery={searchQuery} handleFavoritePhoto={handleFavoritePhoto} favoritePhotos={favoritePhotos} />} />
        <Route path="/favourites" element={<Favourites favoritePhotos={favoritePhotos} />} />
      </Routes>
    </div>
  );
}

export default App;
