import React, { ChangeEvent, FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuid } from "uuid";

const Posts = () => {
  const id = uuid();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const { title, content } = form;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 데이터 생성
  const createDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      id,
      title,
      content,
    };
    try {
      await addDoc(collection(db, "record"), newData);
      alert("작성 완료");
    } catch (error) {
      alert("작성 실패");
      console.error("에러 메시지:", error);
    }
  };

  return (
    <form onSubmit={createDate} className="container">
      <button type="submit">완료</button>
      <div className="posts-box">
        <div className="info">
          <input
            className="title"
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={onChange}
          />
          <textarea
            className="content"
            name="content"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={onChange}
          />
        </div>
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
          height: 300px;
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
    </form>
  );
};

export default Posts;
