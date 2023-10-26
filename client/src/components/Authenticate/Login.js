import { useState } from "react"
import SignUpForm from "./SignUpForm"
import LogInForm from "./LogInForm"

export default function Login({ onLogin }) {
    const [showSignUp, setShowSignUp] = useState(false)
    return (
        <>
            {showSignUp ? (
                <>
                    <SignUpForm onLogin={onLogin} />
                    <hr />
                    <p>
                        Already have an account?
                        <button onClick={() => setShowSignUp(false)}>
                            Log In
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <LogInForm onLogin={onLogin} />
                    <hr />
                    <p>
                        Don't have an account?
                        <button onClick={() => setShowSignUp(true)}>
                            Signup!
                        </button>
                    </p>
                </>
            )}
        </>
    )
}