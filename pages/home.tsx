import HomeGrid from "@/components/HomeGrid";
import HomeInfo from "@/components/HomeInfo";
import React from "react";
import { MdOutlineWbSunny } from "react-icons/md";

const Home = () => {
  return (
    <div className="container">
      <div>
        <div className="title">
          <MdOutlineWbSunny />
          Inspiration
        </div>
        <HomeGrid />
      </div>
      <div>
        <HomeInfo />
      </div>
      <style jsx>{`
        .container {
          padding: 10px;
          display: grid;
          grid-template-columns: 0.7fr 0.3fr;
          column-gap: 20px;
          width: 100%;
          overflow: auto;
        }
        .title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          column-gap: 3px;
        }
      `}</style>
    </div>
  );
};

export default Home;
