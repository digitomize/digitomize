import React from 'react'
import { useNavigation, Form, redirect, useActionData } from 'react-router-dom'

import { signupUser, isLoggedIn } from '../../api'

export function loader(){
    if (isLoggedIn()) {
        return redirect("/user/dashboard")
    }
    return null
}

export async function action({ request }){
    const formData = await request.formData()
    const username = formData.get("username")
    const firstName = formData.get("firstName")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await signupUser({ username,firstName, email, password })
        return redirect('/login')
    }
    catch(err) {
        return err.message
    } 
}

export default function Signup() {
    const errorMessage = useActionData()
    const navigation = useNavigation()
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1>Sign up your account</h1>
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
                        required
                    />
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button
                        disabled={navigation.state === "submitting"}
                    >
                        {navigation.state === "submitting"
                            ? "Signing up..."
                            : "Sign up"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}
