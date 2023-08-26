import { Form, useNavigation, Link, useNavigate } from "react-router-dom"
import GoogleButton from 'react-google-button'
import { auth } from "../../firebase"
import axios from 'axios'
import './css/Login.css'
import { useState } from "react"
import { useUserAuth } from "../context/UserAuthContext"



// export function loader({ request }) {
//     const message = new URL(request.url).searchParams.get("message")
//     if (isLoggedIn()) {
//         return redirect("/user/dashboard/personal")
//     }
//     return message
// }

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
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { logIn, googleSignIn } = useUserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate('/user/dashboard/personal')
        } catch (err) {
            setError(err.message);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault(); // Don't forget the parentheses here
        try {
            await googleSignIn();
            const userEmail = auth.currentUser.email;
            console.log(userEmail);
    
            const idToken = await auth.currentUser.getIdToken(true);
    
            const response = await axios.post("http://localhost:4001/user/signup", {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            console.log(response);
            navigate('/user/dashboard/personal');
        } catch (err) {
            setError(err.message);
        }
    }
    
    // const message = useLoaderData()
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1>Sign in to your account</h1>
                {/* {message && <h3 className="red">{message}</h3>} */}
                {error && <h3 className="red">{error}</h3>}

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
                            <button disabled={navigation.state === "submitting"} className="shadow gradient-custom drop-shadow-2xl focus:shadow-outline focus:outline-none font-light text-white py-2 px-12 rounded">
                                {navigation.state === "submitting"
                                    ? "Logging in..."
                                    : "Log in"
                                }
                            </button>
                        </div>
                    </div>
                </Form>
                <GoogleButton type="dark" className="g-btn" onClick={handleGoogleSignIn} />
                <p> New user ? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}
