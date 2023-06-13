import React from "react";
import { Circles } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Circles
          height="80"
          width="80"
          color="#ffc107"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export { LoaderComponent };
