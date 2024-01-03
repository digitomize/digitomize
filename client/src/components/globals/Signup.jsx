import {
  useNavigation,
  Form,
  useNavigate,
  redirect,
  Link,
} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { isLoggedIn } from "../../../api";
import { auth } from "../../../firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import { MetaData } from "../CustomComponents";
import GoogleAuthButton from "../AuthButtons/GoogleAuthButton";
import GithubAuthButton from "../AuthButtons/GithubAuthButton";
import { ToastContainer, toast } from "react-toastify";
import loginIcon from "/src/assets/fingerprint-animate-blue.svg";
import { Eye, EyeOff } from "lucide-react";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
import SignoutButton from "../../user/components/SignoutButton";

export async function loader() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    return redirect("/login");
  }
  return null;
}

export default function Signup() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useUserAuth();
  const [btnState, setbtnState] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const passwordToggle = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);
    try {
      await signUp(email, password, username, firstName);
      const token = auth.currentUser.accessToken;
      if (token) {
        axios
          .post(`${backendUrl}/user/signup`, {
            name: firstName,
            username: username,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          // .then((res) => console.log(res))
          .catch((err) => setError(err.code));
      }
      navigate("/login");
    } catch (err) {
      toast.error(err.code, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setbtnState(false);
      setError(err.code);
    }
  };

  return (
    <>
      <MetaData path={"signup"} />
      <ToastContainer />
      <div className="phone:pt-4 pb-12 antialiased">
        {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
        <div className="outer w-11/12 flex flex-row mx-auto my-auto phone:border-2 rounded-xl border-jet">
          <div className="left md:w-2/4 max-md:w-full phone:px-12">
            <div className="heading text-center">
              <h1 className="max-phone:mt-8">
                {/* <img src={welcomeBack} alt="" className="text-white" /> */}
                Create an Account
              </h1>
              <p>
                Sign Up for a{" "}
                <span className="text-custom-blue">World of Coding </span>{" "}
                Possibilities
              </p>
            </div>
            <div className="auth-btns flex flex-row gap-2 justify-center mt-4">
              <GoogleAuthButton
                setError={setError}
                btnState={btnState}
                setbtnState={setbtnState}
              />
              <GithubAuthButton
                setError={setError}
                btnState={btnState}
                setbtnState={setbtnState}
              />
            </div>
            <div className="divider mb-0">OR</div>
            <div className="email-form mx-auto my-0">
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col w-full mt-5 mx-auto"
                replace
              >
                <div className="flex flex-col gap-1">
                  <div className="w-full px-3">
                    <label className="label">
                      <p>
                        <span className="label-text">{"#include"}</span>
                        <span className="label-text text-custom-blue">
                          {" <name>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      placeholder="your name"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="label">
                      <p>
                        <span className="label-text">{"#include"}</span>
                        <span className="label-text text-custom-blue">
                          {" <username>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="label">
                      <p>
                        <span className="label-text">{"#include"}</span>
                        <span className="label-text text-custom-blue">
                          {" <email>"}
                        </span>
                      </p>
                    </label>
                    <input
                      type="email"
                      placeholder="you@mail.com"
                      className="input input-bordered w-full bg-black border-2 border-jet"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="label">
                      <p>
                        <span className="label-text">{"import"}</span>
                        <span className="label-text text-custom-blue">
                          {' "password";'}
                        </span>
                      </p>
                    </label>
                    <div className="flex flex-row justify-between p-0 items-center input relative input-bordered w-full bg-black border-2 border-jet">
                      <input
                        type={passwordShow ? "text" : "password"}
                        className="bg-transparent border-none w-full input input-bordered"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="***************"
                        required
                      />
                      {password &&
                        (passwordShow ? (
                          <EyeOff
                            onClick={passwordToggle}
                            className="w-6 h-6 absolute z-50 left-100 right-2"
                          />
                        ) : (
                          <Eye
                            onClick={passwordToggle}
                            className="w-6 h-6 absolute z-50 left-100 right-2"
                          />
                        ))}
                    </div>
                    <label className="label">
                      <span className="label-text-alt"></span>
                      {/* // ! TO ADD */}
                      {/* <span className="label-text-alt text-custom-blue">forgot password?</span> */}
                    </label>
                  </div>
                </div>
                <div className="items-center">
                  <div className="w-full">
                    <SignoutButton
                      onClickFunction={(e) => handleSubmit}
                      isDisabled={btnState}
                      btnName={btnState ? "Joining in..." : "Join the coders"}
                      backgroundColor="bg-[#4285f4]"
                    />
                  </div>
                  <div className="new-user text-center mb-4">
                    <p>
                      already a user?
                      <span className="text-custom-blue mx-1">
                        <Link to="/login">login</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="right md:w-2/4 max-md:hidden px-12 my-auto h-full">
            <img src={loginIcon} alt="Login image" className="" />
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="flex flex-col items-center">
  //     <div className="flex max-phone:flex-col pb-8 phone:w-4/5 mx-auto">
  //       <div className="flex items-center justify-center mb-10 phone:mt-0 w-full phone:w-1/2">
  //         <div className="flex flex-col overflow-hidden px-[27px] my-0 mx-auto font-outfit text-[1.5rem] justify-center items-center">
  //           <h1 className="text-4xl text-center">Sign up your account</h1>
  //           {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
  //           <div className="flex w-full justify-center">
  //             <Form
  //               onSubmit={handleSubmit}
  //               className="w-full h-full max-w-lg mt-8"
  //               replace
  //             >
  //               {/* new form  */}
  //               <div className="flex flex-wrap -mx-3 mb-4">
  //                 <div className="w-full phone:w-1/2 px-3 mb-4 phone:mb-2">
  //                   <label
  //                     className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
  //                     htmlFor="grid-first-name"
  //                   >
  //                     Name
  //                   </label>
  //                   <input
  //                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  //                     id="grid-first-name"
  //                     type="text"
  //                     placeholder="Jane"
  //                     onChange={(e) => setFirstName(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //                 <div className="w-full phone:w-1/2 px-3 mb-4 phone:mb-2">
  //                   <label
  //                     className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
  //                     htmlFor="grid-last-name"
  //                   >
  //                     Username
  //                   </label>
  //                   <input
  //                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //                     id="grid-last-name"
  //                     onChange={(e) => setUsername(e.target.value)}
  //                     type="text"
  //                     placeholder="Doe"
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="flex flex-wrap -mx-3">
  //                 <div className="w-full phone:w-1/2 px-3 mb-4 phone:mb-2">
  //                   <label
  //                     className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
  //                     htmlFor="grid-email"
  //                   >
  //                     Email
  //                   </label>
  //                   <input
  //                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //                     id="grid-email"
  //                     type="email"
  //                     placeholder="Email"
  //                     onChange={(e) => setEmail(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //                 <div className="w-full phone:w-1/2 px-3 mb-4 phone:mb-2">
  //                   <label
  //                     className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
  //                     htmlFor="grid-password"
  //                   >
  //                     Password
  //                   </label>
  //                   <input
  //                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //                     id="grid-password"
  //                     type="password"
  //                     onChange={(e) => setPassword(e.target.value)}
  //                     placeholder="******************"
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="phone:flex phone:items-center items-center">
  //                 <div className="flex w-full justify-center">
  //                   <SignoutButton
  //                     isDisabled={navigation.state === "submitting"}
  //                     btnName={
  //                       navigation.state === "submitting"
  //                         ? "Signing up..."
  //                         : "Sign up"
  //                     }
  //                     backgroundColor="bg-[#4285f4]"
  //                   />
  //                 </div>
  //               </div>
  //             </Form>
  //           </div>
  //           <p className="w-full text-center">
  //             {" "}
  //             Already registered ?{" "}
  //             <Link to="/login" className="text-[#4285f4]">
  //               Login
  //             </Link>
  //           </p>
  //         </div>
  //       </div>
  //       <div className="divider lg:divider-horizontal normal-case">OR</div>
  //       <div className=" phone:w-1/2 flex flex-wrap flex-col items-center justify-start phone:my-36">
  //         <div className="pb-8">
  //           <GoogleAuthButton
  //             setError={setError}
  //             btnText="sign up with google"
  //           />
  //         </div>
  //         <div className="">
  //           <GithubAuthButton
  //             setError={setError}
  //             btnText="sign up with github"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
