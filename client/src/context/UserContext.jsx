import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "@core/api/user.api";

const userContext = createContext();

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Make /me call
    getUserData()
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <userContext.Provider value={{ userDetails }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserDetails() {
  return useContext(userContext);
}
