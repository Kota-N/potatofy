import React, { useEffect } from 'react';
import './FailedToDetect.css';

const FailedToDetect = ({ image }) => {
  useEffect(() => {
    const failureArea = document.querySelector('.failed-to-detect');
    failureArea.style.width = `${image.clientWidth}px`;
    failureArea.style.height = `${image.clientHeight}px`;
  }, []);

  return (
    <div className="failed-to-detect">
      <h3>Could not detect any face...</h3>
    </div>
  );
};

export default FailedToDetect;
