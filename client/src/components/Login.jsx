import { Form, useNavigation, Link, redirect, useActionData, useLoaderData } from "react-router-dom"

import './css/Login.css'
import { loginUser, isLoggedIn } from "../../api"



export function loader({ request }){
    const message = new URL(request.url).searchParams.get("message")
    if (isLoggedIn()) {
        return redirect("/user/dashboard")
    }
    return message
}

export async function action({ request }) {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")
    try {
        const data = await loginUser({ username, password })
        return redirect('/user/dashboard')
    }
    catch(err) {
        return err.message
    } 
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
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        disabled={navigation.state === "submitting"}
                    >
                        {navigation.state === "submitting"
                            ? "Logging in..."
                            : "Log in"
                        }
                    </button>
                </Form>

                <p> New user ? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}
