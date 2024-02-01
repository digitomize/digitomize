import { Form } from "react-router-dom";
import useLoginModal from "../../hooks/useLoginModal";

import GoogleAuthButton from "../AuthButtons/GoogleAuthButton";
import GithubAuthButton from "../AuthButtons/GithubAuthButton";
import SignoutButton from "../../user/components/SignoutButton";

import { Eye, EyeOff, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";


const Modal = () => {


  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [btnState, setbtnState] = useState(false); // disable feature
  const [passwordShow, setPasswordShow] = useState(false);
  const [error, setError] = useState("");
  const [varient, setVarient] = useState("login");


  const passwordToggle = () =>{
    setPasswordShow(!passwordShow);
  };

  const varientToggle = () => {
    if(varient==="login")
    { 
      setVarient("register");
    }else{
      setVarient("login");
    }
  };

  const handleSubmitLogin = async(e) => {
    e.preventDefault();
    setError("");
    setbtnState(true);
    try {
      await logIn(email, password);
      loginModal.onClose();
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

  const handleSubmitSignup = async(e) => {
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
          .catch((err) => {
            setError(err.code);
            console.error("Signup error:", err);
            setError("An error occurred during signup. Please try again.");
            toast.error("An error occurred during signup. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          
          });
      }
      handleSubmitLogin();
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
    <div className={`
        fixed
        w-full
        h-screen
        z-[100]
        bg-zinc-900/10
        flex
        ${loginModal.isOpen ? "flex" : "hidden"}
    `}>
      <div className="
        w-full
        md:max-w-[50%]
        md:w-[50%]
        max-h-screen
        h-screen
        py-8
        overflow-y-scroll
        mx-auto
        bg-zinc-900
        flex
        flex-col
        items-center
        relative
      ">
          <div 
            onClick={() => loginModal.onClose()}
            className="
            absolute
            top-8
            right-8
            p-2
            rounded-full
            cursor-pointer
            hover:bg-zinc-800
          ">
            <X 
              className="
                text-white 
                w-4 
                h-4 
              "
            />
          </div>
          <ToastContainer />
          <div className="
            my-auto
            mx-auto
            w-full
            flex
            flex-col
            items-center
          ">
            <div className="phone:mt-12 antialiased">
              {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
              <div className="w-full phone:px-12">
                {
                  varient==="register"? (
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
                  ) : (
                    <div className="heading text-center">
                      <h1 className="max-phone:mt-8">
                        {/* <img src={welcomeBack} alt="" className="text-white" /> */}
                        Welcome back!
                      </h1>
                      <p>
                        Your <span className="text-custom-blue">virtual presence</span>{" "}
                        was missed...
                      </p>
                    </div>
                  )
                }

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
                  <div className="divider">OR</div>
                  <div className="email-form mx-auto">
                    <Form
                      onSubmit={varient==="login"? handleSubmitLogin : handleSubmitSignup}
                      className="flex flex-col w-full mt-5 mx-auto"
                      replace
                    >
                      <div className="flex flex-col gap-1">
                        {
                          varient=="register" && (
                            <>
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
                            </>
                          )
                        }

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
                            placeholder="you@email.com"
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
                                {" \"password\";"}
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
                            {password && (passwordShow ?
                            <EyeOff onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2"/> :
                            <Eye onClick={passwordToggle} className="w-6 h-6 absolute z-50 left-100 right-2"/>)}
                          </div>
                          <label className="label">
                            <span className="label-text-alt"></span>
                            {/* // ! TO ADD being added by nakul30*/}
                            <Link to="/forgot-password" >
                            <span className="label-text-alt text-custom-blue">forgot password?</span>
                            </Link>
                          </label>
                        </div>

                      </div>
                      <div className="items-center">
                        <div className="w-full">
                          <SignoutButton
                            onClickFunction={(e) => varient==="login" ? handleSubmitLogin : handleSubmitSignup}
                            isDisabled={btnState}
                            btnName={
                              varient==="login" ? (btnState ? "Logging in..." : "Log in") : (btnState ? "Joining in..." : "Join the coders")
                          
                            }
                            backgroundColor="bg-[#4285f4]"
                          />
                        </div>
                        <div className="new-user text-center mb-4">
                          <p>
                          { varient==="login" ? "new user? " : "already a user?"}  
                            <span className="text-custom-blue mx-1">
                              <span onClick={varientToggle} className="cursor-pointer">
                                { varient==="login" ? "signup" : "login"}
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </Form>
                  </div>
              </div>
            </div>
          </div>
        </div>

      
    </div>
  );
};

export default Modal;