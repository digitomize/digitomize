import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
import { auth } from "../firebase";

function ProtectedRoute() {
  const { user } = useUserAuth();

 

  return user && auth?.currentUser?.emailVerified ? (
    <Outlet />
  ) : auth?.currentUser?.emailVerified ? (
    <Navigate to="/login?message=Please login first!" />
  ) : (
    <Navigate to="/resend-email-verification?message=Please verify your email" />
  );
}

export default ProtectedRoute;
