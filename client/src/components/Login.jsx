import { Form, useNavigation, redirect, Link, useNavigate, useLoaderData } from "react-router-dom"
import GoogleButton from 'react-google-button'
import { auth } from "../../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from 'axios'
import './css/Login.css'
import { useState } from "react"
import { useUserAuth } from "../context/UserAuthContext"
import { isLoggedIn } from "../../api"
import { toast, ToastContainer } from "react-toastify"


export function loader({ request }) {
    const message = new URL(request.url).searchParams.get("message")
    // if (isLoggedIn()) {
    //     return redirect("/user/dashboard/personal")
    // }
    return message
}

// export async function action({ request }) {
//     const formData = await request.formData()
//     const email = formData.get("email")
//     const password = formData.get("password")

//     try {
//         const data = await signInWithEmailAndPassword(auth, email, password)
//         auth.currentUser.getIdToken(true).then(async (idToken) => {
//             console.log(idToken);
//             const response = await axios.post("http://localhost:4001/user/dashboard", {
//                 headers: {
//                     Authorization: `Bearer ${idToken}`,
//                     },
//             });
//         });

//         return redirect('/contests')
//     } catch (err) {
//         const errorMessage = err.message
//         return errorMessage
//     }

// }


export default function Login() {
    const message = useLoaderData()
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
            console.log(auth.currentUser.accessToken)
            navigate('/user/dashboard')
        } catch (err) {
            setError(err.message);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault(); // Don't forget the parentheses here
        try {
            const googleAuthProvider = new GoogleAuthProvider();
            await signInWithPopup(auth, googleAuthProvider)
                .then(async () => {
                    await auth.currentUser.getIdToken(true).then(async (idToken) => {
                        // console.log(idToken);
                        await axios.post("http://localhost:4001/user/signup", {
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                            },
                        }).then(res => console.log(res))
                            .catch(err => console.log(err));
                    });
                    navigate('/user/dashboard/personal')
                }).catch(err => setError("internal server error"))
        } catch (err) {
            setError(err.message);
        }
    }

    // const message = useLoaderData()
    return (
        <div className="outer-login-div">
            <ToastContainer />
            <div className="login-container">
                <h1>Sign in to your account</h1>
                {/* {message && toast.success(message)} */}
                {/* {error && <h3 className="red">{error}</h3>} */}

                <Form
                    onSubmit={handleSubmit}
                    className="login-form"
                    replace
                >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-email">
                                Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="******************" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center items-center">
                        <div className="md:w-2/3 ">
                            <button disabled={navigation.state === "submitting"} className="shadow gradient-custom drop-shadow-2xl focus:shadow-outline focus:outline-none font-light text-white py-2 px-12 rounded" type="submit">
                                {navigation.state === "submitting"
                                    ? "Logging in..."
                                    : "Log in"
                                }
                            </button>
                        </div>
                    </div>
                </Form>
                <GoogleButton label={navigation.state === "submitting"
                    ? "Signing in..."
                    : "Sign in with Google"
                } disabled={navigation.state === "submitting"} type="dark" className="g-btn" onClick={handleGoogleSignIn} />
                <p> New user ? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}
