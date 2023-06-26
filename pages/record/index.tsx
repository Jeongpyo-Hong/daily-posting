import Link from "next/link";
import React, { useEffect } from "react";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const Posts = ({ dataArr }: any) => {
  useEffect(() => {
    if (dataArr) return console.log(dataArr);
  }, [dataArr]);

  return (
    <div className="container">
      <div className="main-text">Day-to-day Record</div>
      <Link href="/record/writing">
        <span className="writing">
          <MdEditDocument />
          writing
        </span>
      </Link>
      <ul className="posts-box">
        {dataArr.length > 0 ? (
          dataArr?.map((data: any) => (
            <li className="info" key={data.id}>
              <div className="title">
                <span>{data.title}</span>
                <div>
                  <button>
                    <MdOutlineModeEditOutline />
                  </button>
                  <button>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
              <img src={data.imgUrl} />
              <div className="content">{data.content}</div>
              <div className="date">{data.nowDate}</div>
              <hr />
            </li>
          ))
        ) : (
          <div className="empty">오늘 하루를 기록해보세요</div>
        )}
      </ul>
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
        ul {
          margin: 0 auto;
        }
        ul li {
          margin-bottom: 30px;
        }
        ul li .title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        ul li .title button {
          color: #818181;
          font-size: 20px;
          font-weight: 800;
          margin-left: 5px;
        }
        ul li img {
          background-color: #777777;
          width: 100%;
          height: 300px;
          object-fit: contain;
          margin-bottom: 10px;
        }
        ul li .content {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }
        ul li .date {
          font-size: 14px;
          margin-bottom: 30px;
        }
        .empty {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Posts;

export const getServerSideProps = async () => {
  try {
    // DB에서 데이터 가져오기
    const q = query(collection(db, "record"), orderBy("nowDate", "desc"));
    const res = await getDocs(q);
    const dataArr: any[] = [];

    const imgUrlPromise: any = res.docs.map(async (item) => {
      const data = item.data();
      const imgPath = data.uploadImg;
      const imgUrl = await getImgUrl(imgPath);

      return {
        ...data,
        imgUrl,
      };
    });

    const results = await Promise.all(imgUrlPromise);
    dataArr.push(...results);

    return {
      props: {
        dataArr,
      },
    };
  } catch (error) {
    return {
      props: {
        dataArr: null,
      },
    };
  }
};

const getImgUrl = async (path: any) => {
  console.log("path:", path);
  try {
    const storageRef = ref(storage, `/images/${path}`);
    const imgUrl = await getDownloadURL(storageRef);
    return imgUrl;
  } catch (error) {
    console.log("이미지 가져오기 에러: ", error);
    return null;
  }
};
