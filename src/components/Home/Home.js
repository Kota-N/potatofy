import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import NavLogout from '../NavLogout/NavLogout';
import ImageHolder from '../ImageHolder/ImageHolder';
import logo from '../../assets/logo.svg';

const Home = ({ location }) => {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detectedFaces, setDetectedFasces] = useState([]);
  const [entryCount, setEntryCount] = useState(
    location.state && location.state.entries
  );

  const getDetectionData = async () => {
    setImageUrl(inputValue);
    const data = await axios.post('https://potatofy.herokuapp.com/image', {
      image: inputValue,
    });
    setDetectedFasces(data.data.outputs[0].data.regions);
    if (data.data) {
      const entries = await axios.put(
        'https://potatofy.herokuapp.com/entries',
        {
          id: location.state.id,
        }
      );
      setEntryCount(entries.data);
    }
  };

  const logOut = () => setEntryCount('logout');

  return entryCount === 'logout' || !location.state ? (
    <Redirect to={'/'} />
  ) : (
    <main>
      <NavLogout logOut={logOut} />
      <div className="home">
        <img className="logo" src={logo} alt="Logo" width="400px" />
        <h2>Howdy, {location.state.name}</h2>
        <p>
          You already detected <span className="count">{entryCount}</span>{' '}
          pictures!
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

export default Home;
