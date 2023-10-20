import React from "react";

export default function NewClientForm ({ onShowNewClientForm }) {
    return (
        <div className="new-client-form">
            <h1>New Client Form</h1>
            <button onClick={onShowNewClientForm}>X</button>
        </div>
    )
}