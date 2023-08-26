import { redirect } from "react-router-dom";
import { auth } from "./firebase";
// import { useUserAuth } from "./src/context/UserAuthContext";
import { isLoggedIn } from "./api";

export function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      console.log(currentUser);
      return true;
    } else {
      console.log("no user found");
      return false;
    }
  });
  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
  }
}
