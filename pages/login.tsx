import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("working");
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      alert("이메일과 패스워드를 다시 확인해주세요.");
      console.error("로그인 오류: ", error);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <form onSubmit={onSubmit}>
          <div>
            <span>Email</span>
            <input type="text" name="email" value={email} onChange={onChange} />
          </div>
          <div>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link href="/signup">
          <span className="link">Go to Signup</span>
        </Link>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin-top: -50px;
        }
        .inner-container {
          width: 350px;
          height: 150px;
          background-color: #eee;
          padding: 60px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        span {
          display: inline-block;
          width: 70px;
          margin-bottom: 12px;
        }
        input {
          border-radius: 12px;
          width: 200px;
          height: 20px;
          padding-left: 10px;
        }
        button {
          width: 200px;
          height: 30px;
          font-size: 16px;
          font-weight: 800;
          color: white;
          text-align: center;
          line-height: 28px;
          background-color: #a0a0a0;
          border-radius: 12px;
          margin: 20px 0;
        }
        .link {
          width: 100%;
          font-size: 16px;
          color: darkblue;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
