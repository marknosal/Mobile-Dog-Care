import React from "react";

export default function ExpandedRequest ({ expandedRequest, onExpandClick }) {
    return (
        <div className="request-container">
            <h2>Request: {expandedRequest.id}</h2>
            <button onClick={onExpandClick}>X</button>
            <hr />
        </div>
    )
}