
import {
    Form,
    useNavigation,
    redirect,
    Link,
    useNavigate,
    useLoaderData
} from "react-router-dom"
import loginIcon from "../assets/fingerprint-animate-blue.svg"
import {
    useState
} from "react"

import {
    useUserAuth
} from "../context/UserAuthContext"

import {
    isLoggedIn
} from "../../api"

import {
    ToastContainer, toast
} from "react-toastify"
import welcomeBack from "../assets/welcome-back.svg"
import SignoutButton from "../user/components/SignoutButton"

import GoogleAuthButton from "./AuthButtons/GoogleAuthButton"
import GithubAuthButton from "./AuthButtons/GithubAuthButton"

export async function loader({ request }) {
    const message = new URL(request.url).searchParams.get("message")
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
        return redirect("/u/dashboard")
    }

    return message
}

export default function Login() {
    const message = useLoaderData()
    console.log(message)
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { logIn } = useUserAuth()
    const navigate = useNavigate()
    const [btnState, setbtnState] = useState(false) // disable feature

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setbtnState(true)
        try {
            await logIn(email, password)
            navigate('/u/dashboard')
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
            setbtnState(false)
            setError(err.code);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="phone:mt-12">
                {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
                <div className="outer container w-11/12 flex flex-row mx-auto my-auto phone:border-2 rounded-xl border-jet">
                    <div className="left phone:w-2/4 max-phone:w-full phone:px-12">
                        <div className="heading text-center">
                            <h1 className="max-phone:mt-8">

                                {/* <img src={welcomeBack} alt="" className="text-white" /> */}
                                Welcome back!
                            </h1>
                            <p>
                                Your <span className="text-custom-blue">virtual presence</span> was missed...
                            </p>
                        </div>
                        <div className="auth-btns flex flex-row gap-2 justify-center mt-4">
                            <GoogleAuthButton setError={setError} btnState={btnState} setbtnState={setbtnState} />
                            <GithubAuthButton setError={setError} btnState={btnState} setbtnState={setbtnState} />
                        </div>
                        <div className="divider">OR</div>
                        <div className="email-form mx-auto">
                            <Form
                                onSubmit={handleSubmit}
                                className="flex flex-col w-full mt-5 mx-auto"
                                replace
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="w-full px-3">
                                        <label className="label">
                                            <p>
                                                <span className="label-text">
                                                    {"#include"}
                                                </span>
                                                <span className="label-text text-custom-blue">
                                                    {" <email>"}
                                                </span>
                                            </p>
                                        </label>
                                        <input type="email" placeholder="you@email.com" className="input input-bordered w-full bg-black border-2 border-jet" onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="w-full px-3">
                                        <label className="label">
                                            <p>
                                                <span className="label-text">
                                                    {"import"}
                                                </span>
                                                <span className="label-text text-custom-blue">
                                                    {' "password";'}
                                                </span>
                                            </p>

                                        </label>
                                        <input type="password" className="input input-bordered w-full bg-black border-2 border-jet" onChange={(e) => setPassword(e.target.value)} placeholder="***************" required />
                                        <label className="label">
                                            <span className="label-text-alt"></span>
                                            {/* // ! TO ADD */}
                                            {/* <span className="label-text-alt text-custom-blue">forgot password?</span> */}
                                        </label>
                                    </div>
                                </div>
                                <div className="items-center">
                                    <div className="w-full">
                                        <SignoutButton onClickFunction={(e) => handleSubmit} isDisabled={btnState} btnName={btnState
                                            ? "Logging in..."
                                            : "Log in"}
                                            backgroundColor="bg-[#4285f4]"
                                        />
                                    </div>
                                    <div className="new-user text-center mb-4">
                                        <p>new user?
                                            <span className="text-custom-blue mx-1">
                                                <Link to="/signup">
                                                    signup
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="right phone:w-2/4 max-phone:hidden px-12 my-auto h-full">
                        <img src={loginIcon} alt="Login image" className="" />
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className="flex items-center justify-center mt-24 md:mt-0">
            <ToastContainer />
            <div className="flex flex-col overflow-hidden px-[27px] my-0 mx-auto font-outfit text-[1.5rem] justify-center items-center">
                <h1 className="text-4xl text-center">Sign in to your account</h1>
                {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
                <div className="flex justify-center">
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full max-w-lg mt-5"
                        replace
                    >
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Password
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="******************" required />
                            </div>
                        </div>
                        <div className="md:flex md:items-center items-center">
                            <div className="w-full">
                                <SignoutButton onClickFunction={(e) => handleSubmit} isDisabled={navigation.state === "submitting"} btnName={navigation.state === "submitting"
                                    ? "Logging in..."
                                    : "Log in"}
                                    backgroundColor="bg-[#4285f4]"
                                />
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="flex flex-col items-center p-5 gap-2">
                    <GoogleAuthButton setError={setError} btnText="sign in with google" />
                    <GithubAuthButton setError={setError} btnText="sign in with github" />
                </div>
                <p className="w-full text-center pb-5"> New user ? <Link to="/signup" className="text-[#4285f4]">Signup</Link></p>
            </div>
        </div>
    )
}
