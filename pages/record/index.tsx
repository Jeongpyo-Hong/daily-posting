import Link from "next/link";
import React from "react";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Posts = () => {
  return (
    <div className="container">
      <div className="main-text">Day-to-day Record</div>
      <Link href="/posts/writing">
        <span className="writing">
          <MdEditDocument />
          writing
        </span>
      </Link>
      <div className="posts-box">
        <div className="info">
          <div className="title">
            <span>글 제목</span>
            <div>
              <button>
                <MdOutlineModeEditOutline />
              </button>
              <button>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
          <img src="/inspiration/1.jpg" />
          <div className="content">글 내용</div>
          <div className="date">2023-06-23</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 70%;
          margin: 0 auto;
        }
        .main-text {
          text-align: center;
          font-size: 24px;
          font-weight: 800;
          color: #777777;
          margin: 20px 0 60px;
          text-decoration: 14px underline #eee;
        }
        .writing {
          position: absolute;
          top: 0;
          right: 0;
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
        .posts-box {
          margin: 0 auto;
        }
        .posts-box .info .title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .posts-box .info .title button {
          color: #818181;
          font-size: 20px;
          font-weight: 800;
          margin-left: 5px;
        }
        .posts-box .info img {
          background-color: #777777;
          width: 100%;
          height: 300px;
          object-fit: contain;
          margin-bottom: 10px;
        }
        .posts-box .info .content {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }
        .posts-box .info .date {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Posts;
