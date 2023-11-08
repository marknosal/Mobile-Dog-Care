import React, { useContext } from "react"
import "../../index.css"
import { UserContext } from "../contexts/UserContext"

export default function User() {
    const { user, logout } = useContext(UserContext)

    function handleClick() {
        fetch('/logout', { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    logout()
                }
            })
    }

    return (
        <div className="user-container">
            <h2>Welcome, {user.name}!</h2>
            <p>Your total earnings are: {user.earnings}</p>
            <button 
                className="button-logout"
                onClick={handleClick}
            >
                Logout
            </button>
        </div>
    )
}