import React, { useState, useEffect } from 'react';
import './ImageHolder.css';
import BoundingBox from '../BoundingBox/BoundingBox';
import FailedToDetect from '../FailedToDetect/FailedToDetect';

const ImageHolder = ({ imageUrl, detectedFaces }) => {
  const [potatofied, setPotatofied] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    setPotatofied(false);
  }, [imageUrl]);

  useEffect(() => {
    setImage(document.getElementById('input-image'));
  }, [detectedFaces]);

  return (
    <div className="image-holder">
      <div className="change-face-btn">
        {potatofied ? (
          <button onClick={() => setPotatofied(false)}>UNPOTATOFY...</button>
        ) : (
          <button onClick={() => setPotatofied(true)}>POTATOFY!</button>
        )}
      </div>
      <div className="detect-area">
        <img id="input-image" src={imageUrl} alt="" />
        {detectedFaces ? (
          detectedFaces.map((faceData, index) => {
            return (
              <BoundingBox
                key={faceData.id}
                faceData={faceData}
                index={index}
                potatofied={potatofied}
              />
            );
          })
        ) : (
          <FailedToDetect image={image} />
        )}
      </div>
    </div>
  );
};

export default ImageHolder;
