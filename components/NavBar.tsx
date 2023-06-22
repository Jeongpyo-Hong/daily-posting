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
          Contact
        </div>
      </Link>
      <style jsx>{`
        nav {
          color: black;
        }
        div {
          font-size: 20px;
          font-weight: 800;
          padding: 10px;
          margin-bottom: 6px;
        }
        div.active {
          background-color: #f3f3f3;
          border-radius: 12px;
          color: tomato;
        }
        div:not(.active):hover {
          background-color: #f3f3f3;
          border-radius: 10px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
