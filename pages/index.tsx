import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import Home from "./home";

const index = () => {
  return (
    <Layout>
      <div className="container">
        <div className="title">Daily Posting</div>
        <div className="inner-container">
          <NavBar />
          <Home />
        </div>
      </div>
      <style jsx>{`
        .title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 24px;
          padding-bottom: 16px;
          box-shadow: 0 1px 0 0 #e6e6e6;
        }
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .inner-container {
          display: grid;
          grid-template-columns: 0.3fr 0.7fr;
          height: 100%;
          background-color: antiquewhite;
        }
      `}</style>
    </Layout>
  );
};

export default index;
