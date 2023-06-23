import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Signup = () => {
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
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입이 완료되었습니다.");
      router.push("/home");
    } catch (error) {
      console.error("회원가입 오류: ", error);
    }
  };

  const backHandler = () => {
    router.back();
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
          <button type="submit">Signup</button>
        </form>
        <span className="back" onClick={backHandler}>
          back
        </span>
      </div>
      <style jsx>{`
        .container {
          position: relative;
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
        .back {
          width: 100%;
          font-size: 16px;
          color: darkblue;
          text-align: center;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Signup;
