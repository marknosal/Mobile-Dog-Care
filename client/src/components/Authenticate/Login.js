import { useState } from "react"
import SignUpForm from "./SignUpForm"
import LogInForm from "./LogInForm"

export default function Login({ onLogin }) {
    const [showSignup, setShowSignup] = useState(false)
    return (
        <>
            {showSignup ? (
                <>
                    <SignUpForm onLogin={onLogin} />
                    <hr />
                    <p>
                        Already have an account?
                        <button onClick={() => setShowSignup(false)}>
                            Login
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <LogInForm onLogin={onLogin} />
                    <hr />
                    <p>
                        Don't have an account?
                        <button onClick={() => setShowSignup(true)}>
                            Signup!
                        </button>
                    </p>
                </>
            )}
        </>
    )
}