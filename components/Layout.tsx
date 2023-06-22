import React from "react";
import NavBar from "./NavBar";
import { MdNightlight } from "react-icons/md";
import { useRouter } from "next/router";

const Layout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };

  return (
    <div className="container">
      <div className="title" onClick={onClick}>
        <div>
          <MdNightlight />
          <span>Hongs Daily Note</span>
        </div>
        <span className="login">Login</span>
      </div>
      <div className="inner-container">
        <NavBar />
        <div>{children}</div>
      </div>
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
          cursor: pointer;
        }
        .title > div {
          display: flex;
          align-items: center;
        }
        .title .login {
          font-size: 20px;
        }
        .inner-container {
          display: grid;
          grid-template-columns: 0.15fr 0.85fr;
          column-gap: 20px;
          height: calc(100% - 70px);
          padding: 20px 40px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Layout;
