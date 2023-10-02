// Import necessary components and functions
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

// Create a Logout component
export default function Logout() {
  const navigate = useNavigate();
  // Implement your logout logic here
  async function handleLogout() {
    // Assuming you have an `auth` object for authentication
    await auth.signOut();
    // Show a success message using toast
    toast.success("Logged out successfully");
    // Redirect the user to the login page with a message
    navigate("/login?message=Logged out successfully");
  }

  // Call the logout function when the component mounts
  useEffect(() => {
    handleLogout();
  }, []);

  // You can optionally render a loading indicator or message here
  return <div>Logging out...</div>;
}
