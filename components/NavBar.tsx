import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      <Link href="/home">
        <div className={router.pathname === "/home" ? "active" : ""}>Home</div>
      </Link>
      <Link href="/record">
        <div
          className={
            router.pathname === "/record" ||
            router.pathname === "/record/writing" ||
            router.pathname === "/record/[id]"
              ? "active"
              : ""
          }
        >
          Record
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
