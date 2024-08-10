import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useRecoilState,useSetRecoilState } from "recoil";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import {buttonState,errorState} from '@components/Login'
import { useNavigate } from "react-router-dom";
import githubIcon from "@assets/github.svg";
import axios from "axios";

import { Tooltip } from "@mui/material";
import { uniqueToast } from "../../core/utils/unique-toast";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function GithubAuthButton() {
  const navigate = useNavigate();
  const [btnState,setbtnState] = useRecoilState(buttonState);
  const setError = useSetRecoilState(errorState);
  const toastId = uniqueToast();

  const handleGithubSignIn = async (e) => {
    setbtnState(true);
    e.preventDefault();
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        await axios
          .post(`${backendUrl}/user/signup`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          // .then((res) => console.log(res))
          .catch((err) => console.error(err));
        await auth.currentUser.reload()
        navigate("/u/dashboard");
      })
      .catch((error) => {
        toast.error(error.code, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          toastId: toastId
        });
        setError(error.code);
        setbtnState(false);
      });
  };
  return (
    <>
      <Tooltip title="Continue with Github" arrow>
        <button
          onClick={handleGithubSignIn}
          disabled={btnState}
          className="border-[#8E918F] border-[1.5px] rounded-full"
        >
          <img
            src={githubIcon}
            alt="google button"
            className="m-3"
            width={35}
          />
        </button>
      </Tooltip>
    </>
  );
}
