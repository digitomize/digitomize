import { Form, useNavigation, Link, redirect, useActionData, useLoaderData } from "react-router-dom"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

import './css/Login.css'
import { loginUser, isLoggedIn } from "../../api"



export function loader({ request }) {
    const message = new URL(request.url).searchParams.get("message")
    if (isLoggedIn()) {
        return redirect("/user/dashboard/personal")
    }
    return message
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        const data = await signInWithEmailAndPassword(auth, email, password)
        return redirect('/contests')
    } catch (err) {
        const errorMessage = err.message
        return errorMessage
    }

    // try {
    //     const data = await loginUser({ username, password })
    //     return redirect('/user/dashboard/personal')
    // }
    // catch(err) {
    //     const errorMessage = err.response.data.error
    //     return errorMessage
    // } 
}


export default function Login() {
    const navigation = useNavigation()
    const errorMessage = useActionData()
    const message = useLoaderData()
    console.log(message)
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1>Sign in to your account</h1>
                {message && <h3 className="red">{message}</h3>}
                {errorMessage && <h3 className="red">{errorMessage}</h3>}

                <Form
                    method="post"
                    className="login-form"
                    replace
                >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-email">
                                Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email" name='email' required />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" name='password' placeholder="******************" required />
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

                <p> New user ? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}
