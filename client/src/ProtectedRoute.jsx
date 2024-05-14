import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserAuth } from "@context/UserAuthContext";
import { auth } from "../firebase";

function ProtectedRoute() {
  const { user } = useUserAuth();
  if (user) {
    if (auth && auth?.currentUser?.emailVerified) {
      return <Outlet />;
    } else if (auth && !auth?.currentUser?.emailVerified) {
      return (
        <Navigate to="/resend-email-verification?message=Please verify your email" />
      );
    } else {
      return <Navigate to="/login?message=Please login first!" />;
    }
  } else {
    return <Navigate to="/login?message=Please login first!" />;
  }
}

export default ProtectedRoute;
