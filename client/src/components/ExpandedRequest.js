import React from "react";

export default function ExpandedRequest ({ expandedRequest, onRevertClick }) {
    return (
        <div>
            <h2 onClick={onRevertClick}>Request: {expandedRequest.id}</h2>
        </div>
    )
}