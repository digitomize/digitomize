import { useContext } from "react";
import { createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import { auth } from "../../firebase";
import { useState, useEffect } from "react";

const userAuthContext = createContext();

export function UserAuthContextProvider ({ children }) {
    const [user, setUser] = useState()
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logOut() {
        return signOut(auth)
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <userAuthContext.Provider value={{signUp, user, logIn, logOut, googleSignIn}} >
            {children}
        </userAuthContext.Provider> 
    )
}


export function useUserAuth() {
    return useContext(userAuthContext);
}
