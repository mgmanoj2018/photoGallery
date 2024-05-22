import React, { useEffect, useState } from "react";
// import {FaShare,FaHeart,} from 'react-icons'
import { FaShare, FaHeart, FaDownload } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import Lightbox from 'react-image-lightbox'
import './Photo.css'
const Photo = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [lightboxIndex,SetLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [searchQuery,setSearchQuery] = useState("")

  // fetch the data from url api
  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      console.log("hjgj")
      const clientID = `?client_id=olbVlWC1Og7EUiXxVNcX43o749UO4DwQd_6nFhuytlM`;
      const mainUrl = "https://api.unsplash.com/photos/";
      let url = mainUrl + clientID
      if(searchQuery){
        url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`
      }
      try {
        const reponse = await fetch(url);
        const data = await reponse.json();
        setPhotos(data.results || data);
        setLoading(false);
       // console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchImage();
  }, [searchQuery]);

  // add favirout photo in the favirout list
  

  const handleFavoritePhoto = (photoId) => {
    console.log("favirout")
    const existing = favoritePhotos.find((photo) => photo.id === photoId);
    if (existing) {
      setFavoritePhotos((prevFavorites) => prevFavorites.filter((photo) => photo.id !== photoId));
    } else {
      const photoToAdd = photos.find((photo) => photo.id === photoId);
      setFavoritePhotos((prevFavorites) => [...prevFavorites, photoToAdd]);
    }
  };

  // share photo the particuler image of whatup and email

  const handleShare = (photoURl)=>{
    const shearlink = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this awesome photo: ${photoURl}`)}`
    // `https://api.whatsapp.com/send?text=${encodeURIComponent( `Check out this awesome photo: ${regular}`)}`
    window.open(shearlink,'_blank');
  }

   // download image 

   const handleDownload = async (photoURL, photoId) => {
    const imageBlob = await fetch(photoURL).then((res) => res.blob());
    const link = document.createElement('a');
    link.href = URL.createObjectURL(imageBlob);
    link.download = `photo_${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLightBox = (index)=>{
    SetLightboxIndex(index);
    setIsLightboxOpen(true)
  }
  const closeListBox = ()=>{
    setIsLightboxOpen(false)
  }
  return (
    <main>
      <section>
        {loading ? (
          <p>loading....</p>
        ) : (
          photos.map((item,index) => (
            <article
              key={item.id}
              className={`photos ${favoritePhotos.some(
                (favourit) => favourit.id === photos.id
              )}?"favirout-photo":""`}
            >
              <img 
                onClick={()=>openLightBox(index)}
              src={item.urls.regular} alt={item.alt_description} />
              <div className="photo-info-container">
              <div className="phono-info">
                <h4>{item.user.name}</h4>
                <div
                
                >
                  <div>
                  <div className="share">
                  <FaDownload className="download-icon" onClick={()=>handleDownload(item.urls.full, item.id)}/>
                  <FaShare className="share-icon" onClick={()=>handleShare(item.urls.regular)}/></div>
                  </div>
                </div>
              </div>
              <div className="photo-actions">
                <p><b></b> <AiOutlineLike />{item.likes}</p>
               
              </div>
             <div className="profile-image">
             <a href={item.user.portfolio_url}>
                <img
                  src={item.user.profile_image.medium}
                  alt={item.user.name}
                />
                  <FaHeart   
                  className={`favorite-photo ${favoritePhotos.some(
                    (favourit) => favourit.id === photos.id
                  )}?active:""`}
                  onClick={()=>handleFavoritePhoto(item.id)}/>
              </a>
             </div>
              
              </div>
            </article>
          ))
        )}
        {isLightboxOpen &&(
        <Lightbox 
        mainSrc={photos[lightboxIndex].urls.full}
        onCloseRequest={closeListBox}
        />
      )}
      </section>     
    </main>
  );
};

export default Photo;
