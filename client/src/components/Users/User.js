import React from "react"
import "../../index.css"

export default function User({ user, onLogout }) {

    function handleClick() {
        fetch('/logout', { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    onLogout(null)
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