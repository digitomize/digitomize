import { redirect } from "react-router-dom";
import { auth } from "./firebase";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  // const isLog = isLoggedIn();
  const isLoggedIn = auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("user logged in");
      return true;
    } else {
      console.log("user not logged in");
      return false;
    }
  });

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
  }
}
