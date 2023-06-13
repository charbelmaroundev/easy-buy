import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { SERVER } from "../constants";

const VerificationPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      const emailVerification = async () => {
        try {
          await axios.post(`${SERVER}/user/verification`, {
            token,
          });
        } catch (error) {
          setError(true);
        }
      };
      emailVerification();
    }
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
};

export { VerificationPage };
