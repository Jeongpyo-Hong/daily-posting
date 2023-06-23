import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Posts = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const { title, content } = form;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
    });
  };

  return (
    <div className="container">
      <button>완료</button>
      <div className="posts-box">
        <form className="info">
          <input
            className="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={onChange}
          />
          <textarea
            className="content"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={onChange}
          />
        </form>
      </div>
      <style jsx>{`
        .container {
          width: 70%;
          margin: 100px auto 0;
        }
        button {
          float: right;
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 16px;
          padding: 10px;
          background-color: tomato;
          color: white;
          border-radius: 12px;
        }
        .posts-box {
          margin: 0 auto;
        }
        .posts-box .info .title {
          width: 100%;
          height: 50px;
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
          border: 1px solid #a0a0a0;
          border-radius: 12px;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .posts-box .info .title::placeholder {
          color: #c0c0c0;
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
          height: 400px;
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 20px;
          border: 1px solid #a0a0a0;
          border-radius: 12px;
          padding: 20px;
          box-sizing: border-box;
          resize: none;
        }
        .posts-box .info .content::placeholder {
          color: #c0c0c0;
        }
      `}</style>
    </div>
  );
};

export default Posts;
