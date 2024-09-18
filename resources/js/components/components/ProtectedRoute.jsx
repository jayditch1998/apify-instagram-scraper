import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the token from local storage
  console.log('token: ', token);
  // If token is not present, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected components)
  return children;
};

export default ProtectedRoute;
