import React, { useState, useEffect } from 'react';
import './BoundingBox.css';
const BoundingBox = ({ faceData, index, potatofied }) => {
  const [faceBox, setFaceBox] = useState({});

  useEffect(() => {
    // Calculate face location
    const faceLocation = faceData.region_info.bounding_box;
    const potatofyMeList = document.querySelectorAll('.potatofy-me');
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    setFaceBox({
      leftCol: faceLocation.left_col * width,
      topRow: faceLocation.top_row * height,
      rightCol: width - faceLocation.right_col * width,
      bottomRow: height - faceLocation.bottom_row * height,
    });

    if (potatofied) {
      potatofyMeList[index].classList.add('potatofy');
      potatofyMeList[index].classList.remove('detection-box');
    } else {
      potatofyMeList[index].classList.remove('potatofy');
      potatofyMeList[index].classList.add('detection-box');
    }
  }, [faceData, potatofied, index]);

  return (
    <div
      className="potatofy-me detection-box"
      style={{
        top: faceBox.topRow,
        right: faceBox.rightCol,
        bottom: faceBox.bottomRow,
        left: faceBox.leftCol,
      }}
    ></div>
  );
};

export default BoundingBox;
