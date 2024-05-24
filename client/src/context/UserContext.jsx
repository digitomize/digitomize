import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "@core/api/user.api";
import { useUserAuth } from "./UserAuthContext";

const userContext = createContext();

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const {user} = useUserAuth();

  useEffect(() => {
    // clear user details on logout
    if(!user?.uid) {
      setUserDetails(null);
      return;
    }
    // Make /me call
    getUserData()
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return (
    <userContext.Provider value={{ userDetails }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserDetails() {
  return useContext(userContext);
}
