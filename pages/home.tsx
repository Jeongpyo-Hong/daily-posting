import HomeGrid from "@/components/HomeGrid";
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <div>
        <div className="title">Inspiration</div>
        <HomeGrid />
      </div>
      <div>
        <div className="title">Playlist</div>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
          display: grid;
          grid-template-columns: 0.7fr 0.3fr;
          column-gap: 20px;
        }
        .title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
