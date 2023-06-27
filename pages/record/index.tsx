import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Post from "@/types";

interface PostsParams {
  dataArr: Post[];
}

const Posts = ({ dataArr }: PostsParams) => {
  const [posts, setPosts] = useState(dataArr);

  // 데이터 삭제
  const deleteData = async (id: string) => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      try {
        const docRef = doc(db, "record", id);
        await deleteDoc(docRef);
      } catch (error) {
        alert("글 삭제 실패");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "record"), orderBy("nowDate", "desc")),
      async (snapshot) => {
        const updatedDataArr: any[] = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const documentId = doc.id;
            const data = doc.data();
            const newUploadImg = await getNewUploadImg(data.uploadImg);

            // 문서 데이터와 documentId를 합쳐서 반환
            return {
              ...data,
              uploadImg: newUploadImg,
              id: documentId,
            };
          })
        );

        setPosts(updatedDataArr);
      }
    );

    const getNewUploadImg = async (path: any) => {
      try {
        const storageRef = ref(storage, `images/${path}`);
        const newUploadImg = await getDownloadURL(storageRef);
        return newUploadImg;
      } catch (error) {
        console.log("에러메시지: ", error);
        return null;
      }
    };

    return () => {
      // 구독 취소
      unsubscribe();
    };
  }, []);

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
        {posts && posts.length > 0 ? (
          posts?.map((post: Post) => (
            <li className="info" key={post.id}>
              <div className="title">
                <span>{post.title}</span>
                <div>
                  <Link
                    href={{
                      pathname: `/record/${post.id}`,
                      query: {
                        post: JSON.stringify(post),
                      },
                    }}
                    as={`/record/${post.id}`}
                  >
                    <MdOutlineModeEditOutline />
                  </Link>
                  <button onClick={() => deleteData(post.id)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
              {post.uploadImg ? (
                <Image
                  src={post.uploadImg}
                  alt="record-image"
                  width={100}
                  height={300}
                />
              ) : null}
              <div className="content">{post.content}</div>
              <div className="date">{post.nowDate}</div>
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

    const imgUrlPromise = res.docs.map(async (item) => {
      const data = item.data();
      const newUploadImg = await getUploadImg(data.uploadImg);
      const id = item.id;
      return {
        ...data,
        id,
        uploadImg: newUploadImg,
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

export const getUploadImg = async (path: any) => {
  try {
    const storageRef = ref(storage, `images/${path}`);
    const snapshot = await uploadBytes(storageRef, path);
    const newUploadImg = await getDownloadURL(snapshot.ref);
    return newUploadImg;
  } catch (error) {
    console.log("에러메시지: ", error);
    return null;
  }
};
