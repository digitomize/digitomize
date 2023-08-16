import React from 'react'
import { useNavigation, Form } from 'react-router-dom'

export default function Signup() {
    const navigation = useNavigation()
    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1>Sign Up to your account</h1>
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
                            ? "Signing up..."
                            : "Sign up"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}
