import React from "react";
import NavBar from "./NavBar";
import { MdOutlineLight } from "react-icons/md";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";

const Layout = ({ children }: React.PropsWithChildren) => {
  const user = auth.currentUser;
  const router = useRouter();

  const onClick = () => {
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  // 로그아웃
  const logoutHandler = async () => {
    confirm("로그아웃하시겠습니까?");
    try {
      await auth.signOut();
      alert("로그아웃 되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 오류: ", error);
    }
  };

  const moveLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="container">
      <div className="title">
        <div onClick={onClick}>
          <MdOutlineLight />
          <span>Daily Record</span>
        </div>
        {user ? (
          <span className="login" onClick={logoutHandler}>
            Logout
          </span>
        ) : (
          <span onClick={moveLoginPage} className="login">
            Login
          </span>
        )}
      </div>
      {user ? (
        <div className="inner-container">
          <NavBar />
          <div>{children}</div>
        </div>
      ) : (
        <div className="login-container">{children}</div>
      )}

      <style jsx>{`
        .container {
          height: 100%;
        }
        .title {
          font-size: 30px;
          box-shadow: 0 5px 0 0 #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
        }
        .title > div {
          display: flex;
          align-items: center;
          column-gap: 5px;
          cursor: pointer;
        }
        .title .login {
          font-size: 20px;
          cursor: pointer;
        }
        .inner-container {
          display: grid;
          grid-template-columns: 0.15fr 0.85fr;
          column-gap: 20px;
          height: calc(100% - 70px);
          padding: 20px 40px;
          box-sizing: border-box;
        }
        .login-container {
          height: calc(100% - 70px);
        }
      `}</style>
    </div>
  );
};

export default Layout;
