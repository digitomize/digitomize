import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserAuth } from "@context/UserAuthContext";
import { auth } from "../firebase";

function ProtectedRoute() {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/login?message=Please login first!" />;
  }

  if (auth?.currentUser?.emailVerified) {
    return <Outlet />;
  }

  return <Navigate to="/resend-email-verification?message=Please verify your email" />;
}

export default ProtectedRoute;
