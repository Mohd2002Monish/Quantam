import React from "react";
import SignupPage from "../Pages/SignupPage";
import PrivateRoutes from "../Components/PrivateRoutes";
import { Route, Routes } from "react-router";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
