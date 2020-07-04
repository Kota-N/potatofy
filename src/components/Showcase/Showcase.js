import React, { useEffect } from 'react';
import './Showcase.css';

const Showcase = ({ scrollTop }) => {
  useEffect(() => {
    const showcase1 = document.querySelector('.showcase-container1');
    const showcaseHeight1 = 1215 - document.documentElement.clientHeight;
    const showcase2 = document.querySelector('.showcase-container2');
    const showcaseHeight2 = 1600 - document.documentElement.clientHeight;

    if (scrollTop >= showcaseHeight1) {
      showcase1.style.top = `-${scrollTop - showcaseHeight1}px`;
      showcase1.style.opacity = `${(scrollTop - showcaseHeight1) / 300}`;

      if (scrollTop >= showcaseHeight1 + 400) {
        showcase1.style.opacity = `${
          1 - (scrollTop - showcaseHeight1 - 400) / 200
        }`;
      }
    }

    if (scrollTop >= showcaseHeight2) {
      showcase2.style.top = `${-(scrollTop - showcaseHeight2) + 300}px`;
      showcase2.style.opacity = `${(scrollTop - showcaseHeight2) / 300}`;
    }
  }, [scrollTop]);

  return (
    <div className="showcase">
      {/* container 1 */}
      <div className="showcase-container1">
        <div className="image-container">
          <div className="showcase-image-bg1"></div>
          <div className="showcase-image1"></div>
        </div>
        <div className="text-container">
          <h3>LOREM IPSUM</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            quod facilis ratione consequuntur ducimus similique, ex asperiores
            dolore earum odit.
          </p>
        </div>
      </div>

      {/* container 2 */}
      <div className="showcase-container2">
        <div className="image-container">
          <div className="showcase-image-bg2"></div>
          <div className="showcase-image2"></div>
        </div>
        <div className="text-container">
          <h3>LOREM IPSUM</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
            quod facilis ratione consequuntur ducimus similique, ex asperiores
            dolore earum odit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
