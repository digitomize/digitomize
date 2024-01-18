import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
import { auth } from "../firebase";

function ProtectedRoute() {
  const { user } = useUserAuth();
  
  return user && auth?.currentUser?.emailVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/login?message=Please login first!" />
  );
}

export default ProtectedRoute;
