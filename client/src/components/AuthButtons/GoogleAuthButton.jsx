import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {buttonState,errorState} from '@components/Login';
import { auth } from "../../../firebase";
import googleIcon from "@assets/google.svg";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { uniqueToast } from "../../core/utils/unique-toast";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const [btnState,setbtnState] = useRecoilState(buttonState);
  const setError = useSetRecoilState(errorState);
  const toastId = uniqueToast();
  // const [btnState, setbtnState] = useState(false);
  const handleGoogleSignIn = async (e) => {
    setbtnState(true);
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider)
        .then(async () => {
          await auth.currentUser.getIdToken(true).then(async (idToken) => {
            await axios
              .post(`${backendUrl}/user/signup`, {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              })
              // .then((res) => console.log(res))
              .catch((err) => console.error(err));
          });
          navigate("/u/dashboard");
        })
        .catch((err) => {
          setError(err.code);
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
        });
    } catch (err) {
      setError(err.code);
    }
    setbtnState(false);
  };
  return (
    <>
      <Tooltip title="Continue with Google" arrow>
        <button onClick={handleGoogleSignIn} disabled={btnState}>
          <img src={googleIcon} alt="google button" width={60} />
        </button>
      </Tooltip>
      {/* <GoogleButton type="light" className={`g-btn`} onClick={handleGoogleSignIn} disabled={btnState} label={`${btnState ? 'signing in...' : btnText}`} style={{ backgroundColor: "white" }} /> */}
    </>
  );
}
