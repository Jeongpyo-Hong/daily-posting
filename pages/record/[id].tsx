import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { updateDoc, doc, query, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "@/lib/firebase";
import { v4 as uuid } from "uuid";
import Link from "next/link";

const Update = ({ post }: any) => {
  console.log("post:", post);
  const router = useRouter();
  const searchParams = useSearchParams();
  const param: any = searchParams.get("post");
  const prsingData: any = JSON.parse(param);
  console.log("prsingData:", prsingData);

  const [form, setForm] = useState({
    title: prsingData?.title,
    content: prsingData?.content,
    img: prsingData?.uploadImg,
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

  // 데이터 수정
  const updateData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || content === "")
      return alert("제목과 내용을 입력하세요.");
    const uploadImg = uuid() + ".png";
    const newData = {
      ...post,
      title,
      content,
    };
    const docRef = doc(db, "record", `${prsingData.id}`);
    try {
      // 업로드 이미지가 있는 경우
      if (img) {
        const imgRef = ref(storage, `images/${uploadImg}`);
        uploadBytes(imgRef, img);
        await updateDoc(docRef, { ...newData, uploadImg });
      } else if (!img) {
        // 업로드 이미지가 없는 경우
        await updateDoc(docRef, newData);
      }
      alert("수정 완료");
      router.push(`/record`);
    } catch (error) {
      alert("수정 실패");
      console.error("에러 메시지:", error);
    }
  };

  return (
    <form onSubmit={updateData} className="container">
      <button type="submit">완료</button>
      <Link href={"/record"}>
        <span className="back">뒤로가기</span>
      </Link>
      <div className="posts-box">
        <div className="info">
          <input
            className="title"
            type="text"
            name="title"
            value={title}
            onChange={onChange}
          />
          <textarea
            className="content"
            name="content"
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
        button,
        .back {
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
        .back {
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

export default Update;

export const getServerSideProps = async (context: any) => {
  try {
    // DB에서 데이터 가져오기
    const parsingData = JSON.parse(context.query.post);
    const q = collection(db, "record");
    const res = await getDocs(q);
    const promise = res.docs.map(async (item) => {
      const data = item.data();
      return data;
    });

    const results = await Promise.all(promise);
    const post = results.filter((item) => item.dataId === parsingData.dataId);

    return {
      props: {
        post: post[0],
      },
    };
  } catch (error) {
    return {
      props: {
        post: null,
      },
    };
  }
};
