import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password, username, name) {
    // console.log(`${email}, ${password}, ${username}, ${name}`);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;
        await updateProfile(user, {
          displayName: name,
          photoURL: "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg",
        })
          // .then(() => {
          //   console.log("Profile updated successfully.");
          // })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
        const token = await user.getIdToken();
        sendEmailVerification(user).then(() => {
          /* console.log("Email verification sent."); */
        }).catch((error) => {
          console.error("Error sending email verification:", error);
        });
        return { result, token };
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
        throw error;
      });
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function githubSignIn() {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, githubSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
