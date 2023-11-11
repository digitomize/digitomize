
import {
    Form,
    useNavigation,
    redirect,
    Link,
    useNavigate,
    useLoaderData
} from "react-router-dom"

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
    ToastContainer
} from "react-toastify"

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password)
            navigate('/u/dashboard')
        } catch (err) {
            setError(err.message);
        }
    }

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
