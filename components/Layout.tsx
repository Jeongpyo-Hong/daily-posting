import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          width: 800px;
          height: 600px;
          min-height: 600px;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 10px 0 gray;
        }
      `}</style>
    </div>
  );
};

export default Layout;
