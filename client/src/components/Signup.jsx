import React from 'react'
import { useNavigation, Form, redirect, useActionData } from 'react-router-dom'

import { signupUser } from '../../api'

export async function action({ request }){
    const formData = await request.formData()
    const username = formData.get("username")
    const firstName = formData.get("firstName")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await signupUser({ username,firstName, email, password })
        return redirect('/contests')
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
                    />
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
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
                            ? "Signing up..."
                            : "Sign up"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}
