// Favourites.js
import React from "react";
// import "./Favourites.css";
import { FaShare, FaHeart, FaDownload } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

const Favourites = ({ favoritePhotos, handleFavoritePhoto,handleDownload,handleShare }) => {
  return (
    <main>
      <section>
        {favoritePhotos.length === 0 ? (
          <p>No favorite photos yet.</p>
        ) : (
          favoritePhotos.map((item) => (
            <article key={item.id} className="photos">
              <img src={item.urls.regular} alt={item.alt_description} />
              <div className="photo-info-container">
                <div className="photo-info">
                  <h4>{item.user.name}</h4>
                  <div className="share">
                    <FaDownload
                      className="download-icon"
                      onClick={() => handleDownload(item.urls.full, item.id)}
                    />
                    <FaShare
                      className="share-icon"
                      onClick={() => handleShare(item.urls.regular)}
                    />
                  </div>
                </div>
                <div className="photo-actions">
                  <p>
                    <AiOutlineLike /> {item.likes}
                  </p>
                </div>
                <div className="profile-image">
                  <a href={item.user.portfolio_url}>
                    <img
                      src={item.user.profile_image.medium}
                      alt={item.user.name}
                    />
                  </a>
                  <FaHeart
                    className="favorite-photo active"
                    onClick={() => handleFavoritePhoto(item)}
                  />
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default Favourites;
