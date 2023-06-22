import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <div className={router.pathname === "/" ? "active" : ""}>Home</div>
      </Link>
      <Link href="/post">
        <div className={router.pathname === "/post" ? "active" : ""}>Post</div>
      </Link>
      <Link href="/login">
        <div className={router.pathname === "/login" ? "active" : ""}>
          Login
        </div>
      </Link>
      <style jsx>{`
        nav {
          background-color: #f0f0f0;
          color: black;
          box-sizing: border-box;
          border-radius: 10px;
          padding: 10px;
        }
        div {
          font-size: 20px;
          font-weight: 800;
          padding: 10px;
        }
        div.active {
          color: tomato;
        }
        div:hover {
          background-color: white;
          border-radius: 10px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
