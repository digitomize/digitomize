import { redirect } from "react-router-dom";
import { isLoggedIn } from "./api";

export function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLog = isLoggedIn();
  if (!isLog) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`,
    );
  }
}
