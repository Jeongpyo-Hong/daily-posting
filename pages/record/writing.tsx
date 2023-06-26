import React, { ChangeEvent, FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "@/lib/firebase";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

const Posts = () => {
  let newDate = new Date();
  let year = ("0" + newDate.getFullYear()).slice(-2);
  let month = ("0" + newDate.getMonth()).slice(-2);
  let date = ("0" + (newDate.getDate() + 1)).slice(-2);
  let hour = ("0" + newDate.getHours()).slice(-2);
  let minutes = ("0" + newDate.getMinutes()).slice(-2);
  let seconds = ("0" + newDate.getSeconds()).slice(-2);

  let nowDate = `${year}${month}${date} ${hour}:${minutes}:${seconds}`;

  const router = useRouter();
  const id = uuid();
  const [form, setForm] = useState({
    title: "",
    content: "",
    img: null,
    nowDate,
  });
  const { title, content, img } = form;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeImg = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { files } = e.target;
    setForm({
      ...form,
      img: files[0].name,
    });
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const previewImg = document.createElement("img");
      previewImg.setAttribute("src", e.target?.result);
      document.querySelector("#previewImg")?.appendChild(previewImg);
      previewImg.style.cssText = "width: 100%; height: 300px;";
    };
    reader.readAsDataURL(e.target?.files[0]);
  };

  // 데이터 생성
  const createDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || content === "")
      return alert("제목과 내용을 입력하세요.");
    const uploadImg = uuid() + ".png";
    const newData = {
      id,
      title,
      content,
      nowDate,
    };
    try {
      // 업로드 이미지가 있는 경우
      if (img) {
        const imgRef = ref(storage, `images/${img}`);
        uploadBytes(imgRef, img);
        await addDoc(collection(db, "record"), { ...newData, uploadImg });
      } else if (!img) {
        // 업로드 이미지가 없는 경우
        await addDoc(collection(db, "record"), newData);
      }

      alert("작성 완료");
      setForm({
        title: "",
        content: "",
        img: null,
        nowDate: "",
      });

      router.push("/record");
    } catch (error) {
      alert("작성 실패");
      console.error("에러 메시지:", error);
    }
  };

  return (
    <form onSubmit={createDate} className="container">
      <button type="submit">완료</button>
      <button className="back">뒤로가기</button>
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
          <label htmlFor="input-file">이미지 업로드: </label>
          <input
            type="file"
            name="img"
            id="input-file"
            accept="image/*"
            onChange={onChangeImg}
          />
          <span> {img}</span>
          <div id="previewImg"></div>
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
          margin-left: 8px;
          padding: 10px;
          background-color: tomato;
          color: white;
          border-radius: 12px;
        }
        button.back {
          background-color: #b9b9b9;
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
        #input-file {
          display: none;
        }
        #previewImg {
          margin-bottom: 30px;
          width: 100%;
          height: 300px;
        }
        #previewImg img {
          width: 100%;
          height: 300px;
        }
      `}</style>
    </form>
  );
};

export default Posts;
