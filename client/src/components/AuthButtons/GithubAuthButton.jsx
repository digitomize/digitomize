import { useState } from 'react'
import {
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth"

import {
    auth
} from "../../../firebase"
import { ToastContainer, toast } from "react-toastify"

import { useNavigate } from 'react-router-dom'
import githubIcon from "../../assets/github.svg"
import axios from 'axios'
import GithubButton from 'react-github-login-button'
import { Tooltip } from "@mui/material"
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
                toast.error(error.code, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setError(error.code)
                setbtnState(false);
            });
    }
    return (
        <>
            <Tooltip title="Continue with Github" arrow>
                <button onClick={handleGithubSignIn} disabled={btnState} className="border-[#8E918F] border-[1.5px] rounded-full">
                    <img src={githubIcon} alt="google button" className="m-3" width={35} />
                </button>
            </Tooltip>
            {/* <GithubButton type="light" onClick={handleGithubSignIn} disabled={btnState} label={`${btnState ? 'signing in...' : btnText}`} style={{ backgroundColor: "white" }}>Github</GithubButton> */}
        </>
    )
}
