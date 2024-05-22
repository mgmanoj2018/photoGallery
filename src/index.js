import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter  } from 'react-router-dom'; // Corrected import
import App from './App';
//  import Photo from './Pages/Photo/Photo';
// import Favourites from './Pages/Favourites/Favourites';
// import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <BrowserRouter >
    <App />  
    </BrowserRouter>
  </React.StrictMode>
);


