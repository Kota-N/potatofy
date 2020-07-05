import React, { useState } from 'react';
import axios from 'axios';
import ImageHolder from '../ImageHolder/ImageHolder';
import './GuestHome.css';
import Nav from '../Nav/Nav';
import logo from '../../assets/logo.svg';

const GuestHome = () => {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detectedFaces, setDetectedFasces] = useState([]);

  const getDetectionData = async () => {
    setImageUrl(inputValue);
    try {
      const data = await axios.post('https://potatofy.herokuapp.com/image', {
        image: inputValue,
      });

      setDetectedFasces(data.data.outputs[0].data.regions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <Nav />
      <div className="guest-home">
        <img id="logo" className="logo" src={logo} alt="Logo" width="400px" />
        <h2>Pick an Image, Detect Faces</h2>
        <p>
          Have you always wanted to potatofy someone's face but don't know how?
          <br />
          Here is your solution!
        </p>
        <div className="input-field">
          <input
            onChange={e => setInputValue(e.target.value)}
            type="text"
            autoComplete="off"
            placeholder="Image Url..."
          />
          <button onClick={getDetectionData}>DETECT</button>
        </div>
        <ImageHolder imageUrl={imageUrl} detectedFaces={detectedFaces} />
      </div>
    </main>
  );
};

export default GuestHome;
