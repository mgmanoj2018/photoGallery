// Photo.js
import React, { useEffect, useState } from "react";
import { FaShare, FaHeart, FaDownload } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./Photo.css";

const Photo = ({ searchQuery, handleFavoritePhoto, favoritePhotos }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      const clientID = `?client_id=olbVlWC1Og7EUiXxVNcX43o749UO4DwQd_6nFhuytlM`;
      const mainUrl = "https://api.unsplash.com/photos/";
      const url = mainUrl + clientID;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchImage();
  }, []);

  const filteredPhotos = photos.filter(photo =>
    photo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = (photoURL) => {
    const shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this awesome photo: ${photoURL}`
    )}`;
    window.open(shareLink, "_blank");
  };

  const handleDownload = async (photoURL, photoId) => {
    const imageBlob = await fetch(photoURL).then((res) => res.blob());
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = `photo_${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLightBox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightBox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <main>
      <section>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPhotos.map((item, index) => (
            <article key={item.id} className="photos">
              <img
                onClick={() => openLightBox(index)}
                src={item.urls.regular}
                alt={item.alt_description}
              />
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
                    className={`favorite-photo ${
                      favoritePhotos.some((fav) => fav.id === item.id) ? "active" : ""
                    }`}
                    onClick={() => handleFavoritePhoto(item)}
                  />
                </div>
              </div>
            </article>
          ))
        )}
        {isLightboxOpen && (
          <Lightbox
            mainSrc={filteredPhotos[lightboxIndex].urls.full}
            onCloseRequest={closeLightBox}
          />
        )}
      </section>
    </main>
  );
};

export default Photo;
console.log("add")
