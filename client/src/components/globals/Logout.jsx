import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { auth } from "../../../firebase";

import { toast } from "react-toastify";
import { uniqueToast } from "../../core/utils/unique-toast";

export default function Logout() {
  const navigate = useNavigate();
  const toastId = uniqueToast();
  async function handleLogout() {
    await auth.signOut();
    toast.success("Logged out successfully",{
      toastId
    });
    navigate("/login?message=Logged out successfully");
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
}
