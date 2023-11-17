import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  const { auth } = useSelector((store) => {
    return store.auth;
  });

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoutes;
