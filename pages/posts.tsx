import React from "react";
import { MdEditDocument } from "react-icons/md";

const Posts = () => {
  return (
    <div>
      <div className="title">
        - Express my day in writing -
        <button>
          <MdEditDocument />
          writing
        </button>
      </div>
      <style jsx>{`
        .title {
          position: relative;
          text-align: center;
          font-size: 20px;
          font-weight: 800;
          color: #777777;
        }
        .title button {
          float: right;
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          column-gap: 2px;
          padding: 6px;
          border-radius: 8px;
          background-color: tomato;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Posts;
