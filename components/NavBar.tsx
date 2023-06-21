import React from "react";

const NavBar = () => {
  return (
    <nav>
      <div>
        <button className="nav">Home</button>
        <button className="nav">Posting</button>
      </div>
      <button className="nav">Login</button>
      <style jsx>{`
        nav {
          height: 100%;
          color: black;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        nav > div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .nav {
          font-size: 20px;
          font-weight: 800;
          text-align: left;
        }
        .nav:not(:first-child) {
          margin-top: 14px;
        }
        .nav:last-child {
          margin-bottom: 14px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
