import React from "react";

const HomeGrid = () => {
  return (
    <div className="container">
      <div className="inner-container">
        <div className="images">
          <div className="imgFlex1">
            <img src="/inspiration/1.jpg" />
            <img src="/inspiration/4.jpg" />
            <img src="/inspiration/7.jpg" />
          </div>
        </div>
        <div className="images">
          <div className="imgFlex2">
            <img src="/inspiration/2.jpg" />
            <img src="/inspiration/5.jpg" />
            <img src="/inspiration/8.jpg" />
          </div>
        </div>
        <div className="images">
          <div className="imgFlex3">
            <img src="/inspiration/3.jpg" />
            <img src="/inspiration/6.jpg" />
            <img src="/inspiration/9.jpg" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .inner-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .container .images {
          width: 100%;
          height: auto;
        }
        .container .images .imgFlex1 {
          display: grid;
          row-gap: 20px;
        }
        .container .images .imgFlex2 {
          display: grid;
          row-gap: 20px;
        }
        .container .images .imgFlex3 {
          display: grid;
          row-gap: 20px;
        }
        img {
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 0 3px 1px #c5c5c5;
          transition: transform 0.3s ease;
        }
        img:hover {
          transform: scale(1.05) translateY(0);
        }
      `}</style>
    </div>
  );
};

export default HomeGrid;
