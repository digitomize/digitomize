import React from 'react'
import { useNavigation, Form, useLoaderData } from 'react-router-dom'

export default function Signup() {
    const message = useLoaderData()
    const navigation = useNavigation()
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1>Sign up your account</h1>
                {message && <p className="red">{message}</p>}
                {/* {errorMessage && <h3 className="red">{errorMessage}</h3>} */}

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
                            ? "Signing up..."
                            : "Sign up"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}
