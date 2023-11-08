import { useState } from "react"
import SignUpForm from "./SignUpForm"
import LogInForm from "./LogInForm"

export default function Login() {
    const [showSignUp, setShowSignUp] = useState(false)
    return (
        <div>
            {showSignUp ? (
                <div>
                    <SignUpForm />
                    <hr />
                    <p>
                        Already have an account?
                        <button onClick={() => setShowSignUp(false)}>
                            Log In
                        </button>
                    </p>
                </div>
            ) : (
                <div>
                    <LogInForm />
                    <hr />
                    <p>
                        Don't have an account?
                        <button onClick={() => setShowSignUp(true)}>
                            Signup!
                        </button>
                    </p>
                </div>
            )}
        </div>
    )
}