import { useState } from 'react'
import {
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth"

import {
    auth
} from "../../../firebase"

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import GithubButton from 'react-github-login-button'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;


export default function GithubAuthButton({ setError, btnText }) {
    const navigate = useNavigate();
    const [btnState, setbtnState] = useState(false);
    const handleGithubSignIn = async (e) => {
        setbtnState(true);
        e.preventDefault();
        const provider = new GithubAuthProvider();
        provider.addScope('repo');
        return signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log("token --> ", token);
                // The signed-in user info.
                const user = result.user;
                console.log("user --> ", user);
                console.log("user -->", user.accessToken);
                await axios.post(`${backendUrl}/user/signup`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }).then(res => console.log(res))
                    .catch(err => console.log(err));
                navigate('/u/dashboard/account')

            }).catch((error) => {
                setError(error.code)
                setbtnState(false);
            });
    }
    return (
        <>
            <GithubButton type="light" onClick={handleGithubSignIn} disabled={btnState} label={`${btnState ? 'signing in...' : btnText}`} style={{ backgroundColor: "white" }}>Github</GithubButton>
        </>
    )
}
