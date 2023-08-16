import React from 'react'
import { Form, useNavigation } from "react-router-dom"

import './css/Login.css'

export default function Login() {
    const navigation = useNavigation()
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1>Sign in to your account</h1>
                {/* {message && <h3 className="red">{message}</h3>}
                {errorMessage && <h3 className="red">{errorMessage}</h3>} */}

                <Form 
                    method="post" 
                    className="login-form" 
                    replace
                >
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
                            ? "Logging in..."
                            : "Log in"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}
